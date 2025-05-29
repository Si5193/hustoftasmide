
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { useImageMigration } from '../../hooks/useImageMigration';
import { Upload, CheckCircle } from 'lucide-react';

const ImageMigrationPanel = () => {
  const { migrating, progress, migrateProjectImages } = useImageMigration();

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload size={20} />
          Bildmigrering till Storage
        </CardTitle>
        <CardDescription>
          Migrera befintliga base64-bilder till Supabase Storage för bättre prestanda.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {migrating && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Migrerar bilder...</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        )}
        
        <div className="flex gap-4">
          <Button 
            onClick={migrateProjectImages} 
            disabled={migrating}
            className="flex items-center gap-2"
          >
            {migrating ? (
              <>
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                Migrerar...
              </>
            ) : (
              <>
                <Upload size={16} />
                Starta migration
              </>
            )}
          </Button>
        </div>

        <div className="text-sm text-gray-600 space-y-1">
          <p>• Detta kommer att flytta alla base64-bilder till Storage</p>
          <p>• Bilderna blir snabbare att ladda</p>
          <p>• Processen kan ta några minuter beroende på antal bilder</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageMigrationPanel;
