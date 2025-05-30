
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useImageMigration } from '../../hooks/useImageMigration';
import { useStorageSetup } from '../../hooks/useStorageSetup';
import { Upload, CheckCircle, Database, Pause, Play, RotateCcw, AlertTriangle, Folder, Clock, RefreshCw, Zap, SkipForward } from 'lucide-react';
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
  
  const { 
    bucketExists, 
    checking: checkingBucket, 
    error: bucketError,
    lastChecked,
    refreshBucketStatus,
    forceBucketExists,
    skipBucketCheck
  } = useStorageSetup();
  
  const [migrationStats, setMigrationStats] = useState({
    total: 0,
    base64Images: 0,
    storageImages: 0,
    loading: true
  });

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
  const totalProcessed = progress.completed + progress.failed + progress.skipped;
  const progressPercentage = progress.total > 0 ? Math.round(totalProcessed / progress.total * 100) : 0;
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
          Optimerad Bildmigrering till Storage
        </CardTitle>
        <CardDescription>
          Migrera base64-bilder till Supabase Storage med förbättrad stabilitet och timeout-hantering.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Storage Status with Enhanced Error Handling */}
        {checkingBucket && (
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-600 border-t-transparent" />
              <span className="text-blue-800 font-medium">
                Testar bucket-åtkomst...
              </span>
            </div>
            <p className="text-blue-700 text-sm">
              Utför testuppladdning för att verifiera att storage bucket fungerar korrekt.
            </p>
          </div>
        )}

        {!checkingBucket && bucketError && (
          <div className="bg-red-50 border border-red-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="text-red-600" size={20} />
              <span className="text-red-800 font-medium">
                Storage bucket problem
              </span>
            </div>
            <p className="text-red-700 text-sm mb-3">
              {bucketError}
            </p>
            <p className="text-red-600 text-xs mb-3">
              <strong>Vanligt problem:</strong> API-nyckeln har inte behörighet att lista buckets, men bucket:en kan ändå fungera för migration.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Button 
                onClick={refreshBucketStatus} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <RefreshCw size={14} />
                Testa igen
              </Button>
              <Button 
                onClick={forceBucketExists} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-orange-600 border-orange-300"
              >
                <Zap size={14} />
                Fortsätt ändå
              </Button>
              <Button 
                onClick={skipBucketCheck} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-purple-600 border-purple-300"
              >
                <SkipForward size={14} />
                Hoppa över kontroll
              </Button>
            </div>
            {lastChecked && (
              <p className="text-xs text-red-600 mt-2">
                Senast testad: {lastChecked.toLocaleTimeString()}
              </p>
            )}
          </div>
        )}

        {!checkingBucket && !bucketExists && !bucketError && (
          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <Folder className="text-yellow-600" size={20} />
              <span className="text-yellow-800 font-medium">
                Storage bucket status oklar
              </span>
            </div>
            <p className="text-yellow-700 text-sm mb-3">
              Kunde inte verifiera bucket-status. Detta kan bero på API-behörigheter.
            </p>
            <div className="flex gap-2 flex-wrap">
              <Button 
                onClick={refreshBucketStatus} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1"
              >
                <RefreshCw size={14} />
                Testa igen
              </Button>
              <Button 
                onClick={skipBucketCheck} 
                variant="outline" 
                size="sm"
                className="flex items-center gap-1 text-purple-600 border-purple-300"
              >
                <SkipForward size={14} />
                Hoppa över och fortsätt
              </Button>
            </div>
          </div>
        )}

        {bucketExists && (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle className="text-green-600" size={20} />
              <span className="text-green-800 font-medium">
                Storage bucket verifierad!
              </span>
              <Button 
                onClick={refreshBucketStatus} 
                variant="ghost" 
                size="sm"
                className="ml-auto flex items-center gap-1"
              >
                <RefreshCw size={12} />
              </Button>
            </div>
            <p className="text-green-700 text-sm">
              project-images bucket är redo för migration.
            </p>
            {lastChecked && (
              <p className="text-xs text-green-600 mt-1">
                Verifierad: {lastChecked.toLocaleTimeString()}
              </p>
            )}
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
              <span className="text-sm font-medium text-orange-800">Behöver migreras</span>
            </div>
            <p className="text-2xl font-bold text-orange-900">
              {migrationStats.loading ? '...' : migrationStats.base64Images}
            </p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">Redan migrerade</span>
            </div>
            <p className="text-2xl font-bold text-green-900">
              {migrationStats.loading ? '...' : migrationStats.storageImages}
            </p>
          </div>
        </div>

        {/* Optimization Notice */}
        {canStartMigration && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <h4 className="font-medium mb-2 flex items-center gap-2">
              <Clock size={16} className="text-blue-600" />
              Optimerad Migration
            </h4>
            <div className="text-sm text-blue-700 space-y-1">
              <p>• <strong>En bild åt gången:</strong> Förhindrar database timeouts</p>
              <p>• <strong>3 sekunders paus:</strong> Mellan varje bild för stabilitet</p>
              <p>• <strong>8MB storleksgräns:</strong> För stora bilder hoppas över automatiskt</p>
              <p>• <strong>Automatisk verifiering:</strong> Kontrollerar att uppladdning lyckades</p>
              <p>• <strong>Smart återförsök:</strong> Försöker igen vid tillfälliga fel</p>
            </div>
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
            
            <div className="grid grid-cols-4 gap-4 text-sm">
              <div>
                <span className="text-gray-600">Slutförda:</span>
                <span className="ml-1 font-medium text-green-600">{progress.completed}</span>
              </div>
              <div>
                <span className="text-gray-600">Misslyckade:</span>
                <span className="ml-1 font-medium text-red-600">{progress.failed}</span>
              </div>
              <div>
                <span className="text-gray-600">Hoppade över:</span>
                <span className="ml-1 font-medium text-yellow-600">{progress.skipped}</span>
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
              onClick={() => migrateProjectImages()} 
              disabled={migrating || !canStartMigration}
              className="flex items-center gap-2"
            >
              <Upload size={16} />
              {bucketExists ? 
                `Starta optimerad migration (${migrationStats.base64Images} bilder)` : 
                'Väntar på storage bucket-verifiering'
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
          <p>• <strong>Förbättrad detektering:</strong> Använder testuppladdning istället för bucket-listning</p>
          <p>• <strong>Flexibel hantering:</strong> Kan hoppa över bucket-kontroll vid behörighetsproblem</p>
          <p>• <strong>Optimerad för stabilitet:</strong> En bild åt gången med pauser</p>
          <p>• <strong>Intelligent storlekskontroll:</strong> Hoppar över för stora bilder (&gt;8MB)</p>
          <p>• <strong>Säker:</strong> Verifierar varje uppladdning innan databasuppdatering</p>
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
