import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Trash2, Plus, Package, Plane } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface FleetManagerProps {
  storedPassword: string;
}

const FleetManager = ({ storedPassword }: FleetManagerProps) => {
  const [type, setType] = useState("");
  const [role, setRole] = useState("");
  const [cargo, setCargo] = useState(false);
  const queryClient = useQueryClient();

  const { data: fleet = [], isLoading } = useQuery({
    queryKey: ["admin-fleet"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fleet")
        .select("*")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const createAircraft = useMutation({
    mutationFn: async () => {
      const res = await supabase.functions.invoke("admin-posts", {
        body: {
          password: storedPassword,
          resource: "fleet",
          type,
          role,
          cargo,
          sort_order: fleet.length,
        },
      });
      if (res.error) throw new Error(res.error.message);
      if (res.data?.error) throw new Error(res.data.error);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Aircraft added!");
      setType("");
      setRole("");
      setCargo(false);
      queryClient.invalidateQueries({ queryKey: ["admin-fleet"] });
      queryClient.invalidateQueries({ queryKey: ["fleet"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  const deleteAircraft = useMutation({
    mutationFn: async (id: string) => {
      const res = await supabase.functions.invoke("admin-posts", {
        body: { password: storedPassword, resource: "fleet", action: "delete", id },
      });
      if (res.error) throw new Error(res.error.message);
      if (res.data?.error) throw new Error(res.data.error);
      return res.data;
    },
    onSuccess: () => {
      toast.success("Aircraft removed");
      queryClient.invalidateQueries({ queryKey: ["admin-fleet"] });
      queryClient.invalidateQueries({ queryKey: ["fleet"] });
    },
    onError: (err: Error) => toast.error(err.message),
  });

  return (
    <>
      {/* Add Aircraft */}
      <motion.div
        className="mt-8 rounded-lg border border-border bg-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h2 className="mb-4 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
          <Plus className="h-5 w-5 text-primary" /> Add Aircraft
        </h2>
        <div className="space-y-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <Input
              placeholder="Aircraft type (e.g. Boeing 737-800)"
              value={type}
              onChange={(e) => setType(e.target.value)}
            />
            <Input
              placeholder="Role (e.g. Short-haul)"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            />
          </div>
          <label className="flex items-center gap-2 text-sm text-muted-foreground cursor-pointer">
            <input
              type="checkbox"
              checked={cargo}
              onChange={(e) => setCargo(e.target.checked)}
              className="rounded border-border"
            />
            <Package className="h-4 w-4" />
            Cargo aircraft
          </label>
          <Button
            onClick={() => createAircraft.mutate()}
            disabled={!type || !role || createAircraft.isPending}
          >
            {createAircraft.isPending ? "Adding..." : "Add Aircraft"}
          </Button>
        </div>
      </motion.div>

      {/* Fleet List */}
      <h2 className="mt-12 flex items-center gap-2 font-display text-lg font-semibold text-foreground">
        <Plane className="h-5 w-5 text-primary" /> Current Fleet
      </h2>
      {isLoading ? (
        <div className="mt-4 space-y-3">
          {[1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-lg bg-card" />
          ))}
        </div>
      ) : (
        <div className="mt-4 space-y-3">
          {fleet.map((a) => (
            <div
              key={a.id}
              className="flex items-center justify-between rounded-lg border border-border bg-card p-4"
            >
              <div className="flex items-center gap-3">
                {a.cargo ? (
                  <Package className="h-4 w-4 text-primary" />
                ) : (
                  <Plane className="h-4 w-4 text-muted-foreground" />
                )}
                <div>
                  <p className="font-display font-semibold text-foreground">
                    {a.type}
                  </p>
                  <p className="text-xs text-muted-foreground">{a.role}</p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => deleteAircraft.mutate(a.id)}
                disabled={deleteAircraft.isPending}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default FleetManager;
