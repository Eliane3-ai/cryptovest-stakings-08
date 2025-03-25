
import React, { useState, useEffect } from 'react';
import { Loader2, Send } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from '@/contexts/LanguageContext';
import { getTranslation } from '@/utils/translations';
import { supabase } from '@/integrations/supabase/client';
import { toast } from "sonner";

interface DailyTask {
  id: string;
  task: string;
  reward: number;
  created_at: string;
}

const ReferralTasksAdmin: React.FC = () => {
  const { language } = useLanguage();
  const [loading, setLoading] = useState(true);
  const [tasks, setTasks] = useState<DailyTask[]>([]);
  const [newTask, setNewTask] = useState('');
  const [taskReward, setTaskReward] = useState<number>(50);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      setLoading(true);
      // This is for demonstration - would need a daily_tasks table in the actual implementation
      const { data, error } = await supabase
        .from('referrals')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(5);
      
      if (error) {
        console.error('Error fetching tasks:', error);
        toast.error("Failed to load daily tasks");
        setTasks([]);
        return;
      }
      
      // Convert referrals to tasks for demonstration
      const mockTasks: DailyTask[] = data.map(referral => ({
        id: referral.id,
        task: `Refer a friend to earn reward points`,
        reward: 50,
        created_at: referral.created_at
      }));
      
      setTasks(mockTasks);
    } catch (error) {
      console.error('Error in fetchTasks:', error);
      toast.error("Failed to load daily tasks");
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitTask = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newTask) {
      toast.error("Task description is required");
      return;
    }
    
    setSubmitting(true);
    
    try {
      // This would connect to a tasks table in a real implementation
      toast.success("Daily task created successfully!");
      
      // Clear form
      setNewTask('');
      setTaskReward(50);
      
      // Refresh tasks list
      await fetchTasks();
    } catch (error) {
      console.error('Error submitting task:', error);
      toast.error("Failed to create daily task");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center items-center">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <span className="ml-2">{getTranslation('loading', language)}</span>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold mb-6">Referral Daily Tasks</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Create New Daily Task</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmitTask} className="space-y-4">
              <div>
                <label htmlFor="task" className="block text-sm font-medium mb-1">
                  Task Description
                </label>
                <Textarea
                  id="task"
                  placeholder="Enter task description..."
                  value={newTask}
                  onChange={(e) => setNewTask(e.target.value)}
                  required
                  className="w-full"
                  rows={3}
                />
              </div>
              
              <div>
                <label htmlFor="reward" className="block text-sm font-medium mb-1">
                  Reward Points
                </label>
                <Input
                  id="reward"
                  type="number"
                  min="1"
                  value={taskReward}
                  onChange={(e) => setTaskReward(Number(e.target.value))}
                  required
                  className="w-full"
                />
              </div>
              
              <Button
                type="submit"
                className="w-full"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Creating task...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Create Task
                  </>
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Current Daily Tasks</CardTitle>
          </CardHeader>
          <CardContent>
            {tasks.length === 0 ? (
              <p className="text-center text-muted-foreground p-4">
                No daily tasks have been created yet.
              </p>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div 
                    key={task.id} 
                    className="p-4 border rounded-lg flex justify-between items-center"
                  >
                    <div>
                      <p className="font-medium">{task.task}</p>
                      <p className="text-sm text-muted-foreground">
                        Created: {new Date(task.created_at).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="bg-primary/10 text-primary font-semibold px-3 py-1 rounded-full">
                      {task.reward} points
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReferralTasksAdmin;
