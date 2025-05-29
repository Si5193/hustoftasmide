
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useImageMigration } from '../../hooks/useImageMigration';
import { Upload, CheckCircle, Database } from 'lucide-react';
import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';

const ImageMigrationPanel = () => {
  const { migrating, progress, migrateProjectImages } = useImageMigration();
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

        // Count projects with base64 images
        const { count: base64Count } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .like('image_url', 'data:%');

        // Count projects with storage paths - använd any för TypeScript
        const { count: storageCount } = await supabase
          .from('projects')
          .select('*', { count: 'exact', head: true })
          .not('storage_path', 'is', null) as { count: number | null };

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
  }, [migrating]);

  const needsMigration = migrationStats.base64Images > 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload size={20} />
          Bildmigrering till Storage
        </CardTitle>
        <CardDescription>
          Migrera befintliga base64-bilder till Supabase Storage för bättre prestanda och för att återställa ursprungsbilder.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
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

        {/* Migration Status */}
        {!needsMigration && !migrating && !migrationStats.loading && (
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
        {migrating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Migrerar bilder...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}
        
        {/* Migration Button */}
        <div className="flex gap-4">
          <Button 
            onClick={migrateProjectImages} 
            disabled={migrating || !needsMigration}
            className="flex items-center gap-2"
          >
            {migrating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Migrerar...
              </>
            ) : needsMigration ? (
              <>
                <Upload size={16} />
                Starta migration ({migrationStats.base64Images} bilder)
              </>
            ) : (
              <>
                <CheckCircle size={16} />
                Migration slutförd
              </>
            )}
          </Button>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>• Detta kommer att flytta alla base64-bilder till Storage</p>
          <p>• Bilderna blir snabbare att ladda och originalerna återställs</p>
          <p>• Processen kan ta några minuter beroende på antal bilder</p>
          {needsMigration && (
            <p className="text-orange-600 font-medium">
              • {migrationStats.base64Images} bilder behöver migreras för att återställa ursprungsbilder
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageMigrationPanel;
