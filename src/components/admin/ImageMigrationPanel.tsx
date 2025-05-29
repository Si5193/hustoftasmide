import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useImageMigration } from '../../hooks/useImageMigration';
import { useStorageSetup } from '../../hooks/useStorageSetup';
import { Upload, CheckCircle, Database, Pause, Play, RotateCcw, AlertTriangle, Folder } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const ImageMigrationPanel = () => {
  const { 
    migrating, 
    progress, 
    isPaused,
    migrateProjectImages, 
    pauseMigration, 
    resumeMigration, 
    resetMigration 
  } = useImageMigration();
  
  const { bucketExists, checking: checkingBucket, createBucket } = useStorageSetup();
  
  const [migrationStats, setMigrationStats] = useState({
    total: 0,
    base64Images: 0,
    storageImages: 0,
    loading: true
  });
  const [batchSize, setBatchSize] = useState(2);

  useEffect(() => {
    const fetchMigrationStats = async () => {
      try {
        // Count total projects
        const { count: totalCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true });

        // Count projects with base64 images that don't have storage_path
        const { count: base64Count } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .like('image_url', 'data:%')
          .is('storage_path', null);

        // Count projects with storage paths
        const { count: storageCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .not('storage_path', 'is', null);

        setMigrationStats({
          total: totalCount || 0,
          base64Images: base64Count || 0,
          storageImages: storageCount || 0,
          loading: false
        });
      } catch (error) {
        console.error('Error fetching migration stats:', error);
        setMigrationStats(prev => ({ ...prev, loading: false }));
      }
    };

    fetchMigrationStats();
  }, [migrating, progress.status, bucketExists]);

  const needsMigration = migrationStats.base64Images > 0;
  const progressPercentage = progress.total > 0 ? Math.round((progress.completed + progress.failed) / progress.total * 100) : 0;
  const canStartMigration = bucketExists && needsMigration && progress.status === 'idle';

  const getStatusColor = () => {
    switch (progress.status) {
      case 'completed': return 'text-green-600';
      case 'error': return 'text-red-600';
      case 'paused': return 'text-orange-600';
      case 'running': return 'text-blue-600';
      default: return 'text-gray-600';
    }
  };

  const getStatusIcon = () => {
    switch (progress.status) {
      case 'completed': return <CheckCircle className="text-green-600" size={20} />;
      case 'error': return <AlertTriangle className="text-red-600" size={20} />;
      case 'paused': return <Pause className="text-orange-600" size={20} />;
      case 'running': return <div className="h-5 w-5 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />;
      default: return <Upload className="text-gray-600" size={20} />;
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload size={20} />
          Avancerad Bildmigrering till Storage
        </CardTitle>
        <CardDescription>
          Migrera befintliga base64-bilder till Supabase Storage med förbättrad felhantering och batch-bearbetning.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Storage Setup Warning */}
        {!checkingBucket && !bucketExists && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Folder className="text-yellow-600" size={20} />
              <span className="text-yellow-800 font-medium">
                Storage bucket saknas
              </span>
            </div>
            <p className="text-yellow-700 text-sm mb-3">
              Du behöver skapa en storage bucket för projektbilder innan migreringen kan starta.
            </p>
            <Button onClick={createBucket} size="sm" className="flex items-center gap-2">
              <Folder size={16} />
              Skapa Storage Bucket
            </Button>
          </div>
        )}

        {/* Migration Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Database size={16} className="text-blue-600" />
              <span className="text-sm font-medium text-blue-800">Totalt projekt</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              {migrationStats.loading ? '...' : migrationStats.total}
            </p>
          </div>
          
          <div className="bg-orange-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <Upload size={16} className="text-orange-600" />
              <span className="text-sm font-medium text-orange-800">Base64-bilder</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">
              {migrationStats.loading ? '...' : migrationStats.base64Images}
            </p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">Storage-bilder</span>
            </div>
            <p className="text-2xl font-bold text-green-900">
              {migrationStats.loading ? '...' : migrationStats.storageImages}
            </p>
          </div>
        </div>

        {/* Migration Settings */}
        {canStartMigration && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium mb-3">Migreringsinställningar</h4>
            <div className="flex items-center gap-4">
              <label className="text-sm font-medium">Batch-storlek:</label>
              <select 
                value={batchSize} 
                onChange={(e) => setBatchSize(Number(e.target.value))}
                className="border rounded px-2 py-1 text-sm"
              >
                <option value={1}>1 bild åt gången (säkrast)</option>
                <option value={2}>2 bilder åt gången (rekommenderat)</option>
                <option value={3}>3 bilder åt gången</option>
                <option value={5}>5 bilder åt gången</option>
              </select>
            </div>
            <p className="text-xs text-gray-600 mt-2">
              Mindre batch-storlek = stabilare men långsammare. Större = snabbare men risk för timeout.
            </p>
          </div>
        )}

        {/* Migration Status */}
        {!needsMigration && !migrating && !migrationStats.loading && progress.status !== 'running' && bucketExists && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              <span className="text-green-800 font-medium">
                Alla bilder är redan migrerade till Storage!
              </span>
            </div>
          </div>
        )}

        {/* Migration Progress */}
        {(migrating || progress.status !== 'idle') && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getStatusIcon()}
                <span className={`font-medium ${getStatusColor()}`}>
                  {progress.status === 'running' && 'Migrerar bilder...'}
                  {progress.status === 'paused' && 'Migration pausad'}
                  {progress.status === 'completed' && 'Migration slutförd!'}
                  {progress.status === 'error' && 'Migration misslyckades'}
                </span>
              </div>
              <span className="text-sm text-gray-600">
                {progressPercentage}%
              </span>
            </div>
            
            <Progress value={progressPercentage} className="w-full" />
            
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Slutförda:</span>
                <span className="ml-1 font-medium text-green-600">{progress.completed}</span>
              </div>
              <div>
                <span className="text-gray-600">Misslyckade:</span>
                <span className="ml-1 font-medium text-red-600">{progress.failed}</span>
              </div>
              <div>
                <span className="text-gray-600">Totalt:</span>
                <span className="ml-1 font-medium">{progress.total}</span>
              </div>
            </div>
            
            {progress.current && (
              <div className="text-sm text-gray-600">
                <span className="font-medium">Aktuellt projekt:</span> {progress.current}
              </div>
            )}
          </div>
        )}
        
        {/* Migration Controls */}
        <div className="flex gap-3">
          {progress.status === 'idle' && (
            <Button 
              onClick={() => migrateProjectImages(batchSize)} 
              disabled={migrating || !canStartMigration}
              className="flex items-center gap-2"
            >
              <Upload size={16} />
              {bucketExists ? 
                `Starta migration (${migrationStats.base64Images} bilder)` : 
                'Skapa bucket först'
              }
            </Button>
          )}
          
          {progress.status === 'running' && (
            <Button 
              onClick={pauseMigration}
              variant="outline"
              className="flex items-center gap-2"
            >
              <Pause size={16} />
              Pausa
            </Button>
          )}
          
          {progress.status === 'paused' && (
            <Button 
              onClick={resumeMigration}
              className="flex items-center gap-2"
            >
              <Play size={16} />
              Återuppta
            </Button>
          )}
          
          {(progress.status === 'completed' || progress.status === 'error' || progress.status === 'paused') && (
            <Button 
              onClick={resetMigration}
              variant="outline"
              className="flex items-center gap-2"
            >
              <RotateCcw size={16} />
              Återställ
            </Button>
          )}
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>• <strong>Förbättrad version:</strong> Batch-bearbetning, retry-logik och timeout-hantering</p>
          <p>• <strong>Säker:</strong> Verifierar uppladdningar innan databasuppdatering</p>
          <p>• <strong>Pausbar:</strong> Kan pausas och återupptas när som helst</p>
          <p>• <strong>Robust:</strong> Automatisk återförsök vid misslyckade uppladdningar</p>
          {needsMigration && bucketExists && (
            <p className="text-orange-600 font-medium">
              • {migrationStats.base64Images} bilder behöver migreras för optimal prestanda
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageMigrationPanel;
