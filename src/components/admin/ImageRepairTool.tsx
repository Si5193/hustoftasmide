
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useSupabaseProjects } from '../../hooks/useSupabaseProjects';
import { useImageUpload } from '../../hooks/useImageUpload';
import { useToast } from '@/hooks/use-toast';
import { Wrench, CheckCircle, AlertTriangle } from 'lucide-react';

const ImageRepairTool = () => {
  const [isRepairing, setIsRepairing] = useState(false);
  const [repairedCount, setRepairedCount] = useState(0);
  const { projects, updateProject } = useSupabaseProjects();
  const { uploadImage } = useImageUpload();
  const { toast } = useToast();

  // Find projects with base64 images that need repair
  const projectsNeedingRepair = projects.filter(project => 
    project.image && project.image.startsWith('data:') && !project.storage_path
  );

  const repairNextImage = async () => {
    const projectToRepair = projectsNeedingRepair[0];
    if (!projectToRepair) {
      toast({
        title: "Inga bilder att reparera",
        description: "Alla projekt har redan korrekta bilder.",
      });
      return;
    }

    setIsRepairing(true);
    
    try {
      console.log(`🔧 Repairing image for project: ${projectToRepair.title}`);
      
      // Convert base64 to blob
      const response = await fetch(projectToRepair.image);
      const blob = await response.blob();
      
      // Create a File object from the blob
      const file = new File([blob], 'repair-image.jpg', { type: 'image/jpeg' });
      
      // Upload compressed version
      const uploadResult = await uploadImage(file);
      
      if (uploadResult) {
        // Update project with new storage path and URL
        const success = await updateProject(projectToRepair.id, {
          image: uploadResult.publicUrl,
          storage_path: uploadResult.storagePath
        });
        
        if (success) {
          setRepairedCount(prev => prev + 1);
          toast({
            title: "Bild reparerad!",
            description: `"${projectToRepair.title}" - Komprimerad från ${(uploadResult.originalSize / 1024).toFixed(1)}KB till ${(uploadResult.compressedSize / 1024).toFixed(1)}KB`,
          });
        }
      }
      
    } catch (error) {
      console.error('Error repairing image:', error);
      toast({
        title: "Reparationsfel",
        description: `Kunde inte reparera bilden för "${projectToRepair.title}". Försök igen.`,
        variant: "destructive",
      });
    } finally {
      setIsRepairing(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Wrench size={20} />
          Reparera gamla bilder
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-blue-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-orange-600" />
              <span className="text-sm font-medium text-blue-800">Behöver repareras</span>
            </div>
            <p className="text-2xl font-bold text-blue-900">
              {projectsNeedingRepair.length}
            </p>
          </div>
          
          <div className="bg-green-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-green-600" />
              <span className="text-sm font-medium text-green-800">Reparerade</span>
            </div>
            <p className="text-2xl font-bold text-green-900">
              {repairedCount}
            </p>
          </div>
          
          <div className="bg-gray-50 p-3 rounded-lg">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-gray-600" />
              <span className="text-sm font-medium text-gray-800">Totalt projekt</span>
            </div>
            <p className="text-2xl font-bold text-gray-900">
              {projects.length}
            </p>
          </div>
        </div>

        {projectsNeedingRepair.length > 0 ? (
          <div className="space-y-3">
            <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-lg">
              <h4 className="font-medium text-yellow-800 mb-1">Nästa projekt att reparera:</h4>
              <p className="text-yellow-700">"{projectsNeedingRepair[0].title}"</p>
              <p className="text-xs text-yellow-600 mt-1">
                Bilden kommer att komprimeras och sparas i Storage för snabbare laddning.
              </p>
            </div>
            
            <Button 
              onClick={repairNextImage}
              disabled={isRepairing}
              className="w-full"
            >
              {isRepairing ? (
                <div className="flex items-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Reparerar bild...
                </div>
              ) : (
                'Reparera nästa bild'
              )}
            </Button>
          </div>
        ) : (
          <div className="bg-green-50 border border-green-200 p-4 rounded-lg text-center">
            <CheckCircle className="mx-auto h-8 w-8 text-green-600 mb-2" />
            <h3 className="font-medium text-green-800 mb-1">Alla bilder är reparerade!</h3>
            <p className="text-green-700 text-sm">
              Alla projekt använder nu optimerade bilder från Storage.
            </p>
          </div>
        )}

        <div className="text-sm text-gray-600 space-y-1">
          <p>• <strong>En bild åt gången:</strong> Säker och kontrollerad process</p>
          <p>• <strong>Automatisk komprimering:</strong> Reducerar bildstorlek till &lt;500KB</p>
          <p>• <strong>Behåller kvalitet:</strong> Optimal balans mellan storlek och kvalitet</p>
          <p>• <strong>Storage-optimerat:</strong> Snabbare laddning på hemsidan</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageRepairTool;
