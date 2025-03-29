"use client";

import { useState, useEffect, useMemo } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { researchProjectsApi, ResearchProject } from '@/lib/api-service';

export default function ProjectsManager() {
  const [projects, setProjects] = useState<ResearchProject[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isAdding, setIsAdding] = useState(false);
  const [editing, setEditing] = useState<ResearchProject | null>(null);
  const [newProject, setNewProject] = useState<Omit<ResearchProject, 'id'>>({
    title: '',
    description: '',
    period: '',
    fundingSource: '',
    status: 'ongoing',
    researchers: '',
  });

  // Fetch projects
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const data = await researchProjectsApi.getAll();
        setProjects(data);
      } catch (error) {
        console.error('Failed to fetch projects:', error);
        toast.error('Failed to load projects');
      }
    };
    fetchProjects();
  }, []);

  // Handle adding a new project
  const handleAdd = async () => {
    try {
      const created = await researchProjectsApi.create(newProject);
      setProjects(prev => [created, ...prev]);
      setIsAdding(false);
      setNewProject({
        title: '',
        description: '',
        period: '',
        fundingSource: '',
        status: 'ongoing',
        researchers: '',
      });
      toast.success('Project added successfully');
    } catch (error) {
      console.error('Failed to add project:', error);
      toast.error('Failed to add project');
    }
  };

  // Handle updating a project
  const handleUpdate = async () => {
    if (!editing) return;
    
    try {
      const updated = await researchProjectsApi.update(editing);
      setProjects(prev => 
        prev.map(p => p.id === updated.id ? updated : p)
      );
      setEditing(null);
      toast.success('Project updated successfully');
    } catch (error) {
      console.error('Failed to update project:', error);
      toast.error('Failed to update project');
    }
  };

  // Handle deleting a project
  const handleDelete = async (id: number) => {
    try {
      await researchProjectsApi.delete(id);
      setProjects(prev => prev.filter(p => p.id !== id));
      toast.success('Project deleted successfully');
    } catch (error) {
      console.error('Failed to delete project:', error);
      toast.error('Failed to delete project');
    }
  };

  // Filter projects based on search query
  const filteredProjects = useMemo(() => {
    return projects.filter(proj => 
      proj.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      proj.period.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (proj.fundingSource && proj.fundingSource.toLowerCase().includes(searchQuery.toLowerCase())) ||
      proj.researchers.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [projects, searchQuery]);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <Input
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button onClick={() => setIsAdding(true)} className="flex items-center gap-2">
          <Plus className="h-4 w-4" />
          Add Project
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex justify-between">
                  <div>
                    <CardTitle>{project.title}</CardTitle>
                    <CardDescription>{project.period}</CardDescription>
                  </div>
                  <div className="flex gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => setEditing(project)}
                    >
                      Edit
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm"
                      onClick={() => handleDelete(project.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-base mb-4">{project.description}</p>
                <div className="space-y-2 text-sm text-slate-600">
                  {project.fundingSource && <div>Funding Source: {project.fundingSource}</div>}
                  <div>Researchers: {project.researchers}</div>
                  <div>Status: {project.status}</div>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <div className="col-span-full min-h-[200px] flex items-center justify-center bg-slate-50 rounded-lg border shadow-sm">
            <p className="text-center text-muted-foreground">
              {searchQuery 
                ? 'No projects found matching your search criteria.'
                : 'No projects available. Click on "Add Project" to create one.'}
            </p>
          </div>
        )}
      </div>

      {/* Add Project Dialog */}
      <Dialog open={isAdding} onOpenChange={setIsAdding}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Project</DialogTitle>
            <DialogDescription>
              Add details for a new research project.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={newProject.title}
                onChange={(e) => setNewProject({...newProject, title: e.target.value})}
                placeholder="e.g. Cancer Research Study"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={newProject.description}
                onChange={(e) => setNewProject({...newProject, description: e.target.value})}
                placeholder="Brief description of the project"
                rows={4}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="period">Period</Label>
              <Input
                id="period"
                value={newProject.period}
                onChange={(e) => setNewProject({...newProject, period: e.target.value})}
                placeholder="e.g. 2020-2023"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="fundingSource">Funding Source</Label>
              <Input
                id="fundingSource"
                value={newProject.fundingSource}
                onChange={(e) => setNewProject({...newProject, fundingSource: e.target.value})}
                placeholder="e.g. NIH Grant"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="researchers">Researchers</Label>
              <Input
                id="researchers"
                value={newProject.researchers}
                onChange={(e) => setNewProject({
                  ...newProject, 
                  researchers: e.target.value
                })}
                placeholder="e.g. Dr. Smith, Dr. Johnson"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="status">Project Status</Label>
              <select
                id="status"
                value={newProject.status}
                onChange={(e) => setNewProject({
                  ...newProject, 
                  status: e.target.value as 'ongoing' | 'completed'
                })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsAdding(false)}>Cancel</Button>
            <Button onClick={handleAdd}>Add Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Project Dialog */}
      <Dialog open={!!editing} onOpenChange={(open) => !open && setEditing(null)}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Edit Project</DialogTitle>
            <DialogDescription>
              Update project details.
            </DialogDescription>
          </DialogHeader>
          {editing && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Title</Label>
                <Input
                  id="edit-title"
                  value={editing.title}
                  onChange={(e) => setEditing({...editing, title: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea
                  id="edit-description"
                  value={editing.description}
                  onChange={(e) => setEditing({...editing, description: e.target.value})}
                  rows={4}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-period">Period</Label>
                <Input
                  id="edit-period"
                  value={editing.period}
                  onChange={(e) => setEditing({...editing, period: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-fundingSource">Funding Source</Label>
                <Input
                  id="edit-fundingSource"
                  value={editing.fundingSource}
                  onChange={(e) => setEditing({...editing, fundingSource: e.target.value})}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-researchers">Researchers</Label>
                <Input
                  id="edit-researchers"
                  value={editing.researchers}
                  onChange={(e) => setEditing({
                    ...editing, 
                    researchers: e.target.value
                  })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-status">Project Status</Label>
                <select
                  id="edit-status"
                  value={editing.status}
                  onChange={(e) => setEditing({
                    ...editing, 
                    status: e.target.value as 'ongoing' | 'completed'
                  })}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                >
                  <option value="ongoing">Ongoing</option>
                  <option value="completed">Completed</option>
                </select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditing(null)}>Cancel</Button>
            <Button onClick={handleUpdate}>Update Project</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
} 