import ErrorMessage from "@/components/ErrorMessage";
import LoadingSpinner from "@/components/LoadingSpinner";
import { Button } from "@/components/ui/button";
import {
  useAddFacility,
  useDeleteFacility,
  useFacilities,
  useUpdateFacility,
} from "@/hooks/useFacilities";
import type { Facility } from "@/types";
import {
  AlertTriangle,
  CheckCircle2,
  Pencil,
  Plus,
  Star,
  Trash2,
  X,
  XCircle,
} from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface FacilityFormData {
  name: string;
  description: string;
}

interface FacilityFormProps {
  initial?: FacilityFormData;
  onSubmit: (data: FacilityFormData) => void;
  onCancel: () => void;
  isPending: boolean;
  mode: "add" | "edit";
}

function FacilityForm({
  initial,
  onSubmit,
  onCancel,
  isPending,
  mode,
}: FacilityFormProps) {
  const [name, setName] = useState(initial?.name ?? "");
  const [description, setDescription] = useState(initial?.description ?? "");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Facility name is required");
      return;
    }
    onSubmit({ name: name.trim(), description: description.trim() });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="form-label" htmlFor="facility-name">
          Facility Name *
        </label>
        <input
          id="facility-name"
          type="text"
          className="form-input text-sm"
          placeholder="e.g. AC Vehicle, Airport Transfer..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          autoComplete="off"
          required
          data-ocid="facility-name-input"
        />
      </div>
      <div>
        <label className="form-label" htmlFor="facility-desc">
          Description
        </label>
        <textarea
          id="facility-desc"
          className="form-input text-sm resize-none"
          rows={3}
          placeholder="Brief description of this facility..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          data-ocid="facility-description-input"
        />
      </div>
      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          className="flex-1"
          onClick={onCancel}
          disabled={isPending}
        >
          Cancel
        </Button>
        <button
          type="submit"
          className="btn-primary flex-1 text-sm disabled:opacity-60"
          disabled={isPending}
          data-ocid={`facility-${mode}-submit`}
        >
          {isPending
            ? mode === "add"
              ? "Adding..."
              : "Saving..."
            : mode === "add"
              ? "Add Facility"
              : "Save Changes"}
        </button>
      </div>
    </form>
  );
}

interface DeleteConfirmProps {
  name: string;
  onConfirm: () => void;
  onCancel: () => void;
  isPending: boolean;
}

function DeleteConfirm({
  name,
  onConfirm,
  onCancel,
  isPending,
}: DeleteConfirmProps) {
  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm border-0 max-w-none w-full h-full m-0"
    >
      <div className="form-card w-full max-w-sm shadow-elevated">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-destructive" />
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground text-sm">
              Delete Facility
            </h3>
            <p className="text-xs text-muted-foreground truncate max-w-[200px]">
              {name}
            </p>
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-5">
          This facility will be permanently deleted and cannot be recovered.
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onCancel}
            disabled={isPending}
          >
            Cancel
          </Button>
          <button
            type="button"
            className="flex-1 px-4 py-2 bg-destructive text-destructive-foreground rounded-sm font-semibold text-sm hover:opacity-90 transition-smooth disabled:opacity-60"
            onClick={onConfirm}
            disabled={isPending}
            data-ocid="facility-delete-confirm-btn"
          >
            {isPending ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </dialog>
  );
}

interface FacilityCardProps {
  facility: Facility;
  onEdit: (facility: Facility) => void;
  onDelete: (facility: Facility) => void;
  onToggle: (facility: Facility) => void;
  isTogglingId: string | null;
}

function FacilityCard({
  facility,
  onEdit,
  onDelete,
  onToggle,
  isTogglingId,
}: FacilityCardProps) {
  return (
    <div
      className="form-card space-y-3"
      data-ocid={`facility-card-${facility.id}`}
    >
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-semibold text-foreground text-sm truncate">
              {facility.name}
            </p>
            {facility.active ? (
              <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0" />
            ) : (
              <XCircle className="w-4 h-4 text-muted-foreground flex-shrink-0" />
            )}
          </div>
          {facility.description && (
            <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
              {facility.description}
            </p>
          )}
        </div>

        {/* Active toggle */}
        <button
          type="button"
          role="switch"
          aria-checked={facility.active}
          aria-label={facility.active ? "Deactivate" : "Activate"}
          disabled={isTogglingId === facility.id}
          onClick={() => onToggle(facility)}
          className={`relative inline-flex h-5 w-9 flex-shrink-0 rounded-full border-2 border-transparent transition-smooth cursor-pointer disabled:opacity-60 ${
            facility.active ? "bg-primary" : "bg-muted-foreground/30"
          }`}
          data-ocid={`facility-toggle-${facility.id}`}
        >
          <span
            className={`inline-block h-4 w-4 rounded-full bg-card shadow-xs transition-transform ${
              facility.active ? "translate-x-4" : "translate-x-0"
            }`}
          />
        </button>
      </div>

      <div className="flex items-center gap-2 pt-1">
        <span
          className={`text-xs px-2 py-0.5 rounded-sm font-medium ${
            facility.active
              ? "bg-accent/10 text-accent"
              : "bg-muted text-muted-foreground"
          }`}
        >
          {facility.active ? "Active" : "Inactive"}
        </span>
        <span className="text-xs text-muted-foreground ml-auto">
          {new Date(facility.createdAt).toLocaleDateString("en-IN", {
            day: "2-digit",
            month: "short",
            year: "2-digit",
          })}
        </span>
        <button
          type="button"
          onClick={() => onEdit(facility)}
          className="p-1.5 rounded-sm hover:bg-muted transition-smooth text-muted-foreground hover:text-foreground"
          aria-label="Edit facility"
          data-ocid={`facility-edit-btn-${facility.id}`}
        >
          <Pencil className="w-3.5 h-3.5" />
        </button>
        <button
          type="button"
          onClick={() => onDelete(facility)}
          className="p-1.5 rounded-sm hover:bg-destructive/10 transition-smooth text-muted-foreground hover:text-destructive"
          aria-label="Delete facility"
          data-ocid={`facility-delete-btn-${facility.id}`}
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

export default function AdminFacilities() {
  const { data: facilities = [], isLoading, error, refetch } = useFacilities();
  const addFacility = useAddFacility();
  const updateFacility = useUpdateFacility();
  const deleteFacility = useDeleteFacility();

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingFacility, setEditingFacility] = useState<Facility | null>(null);
  const [deletingFacility, setDeletingFacility] = useState<Facility | null>(
    null,
  );
  const [isTogglingId, setIsTogglingId] = useState<string | null>(null);

  // Close edit modal when facility updates
  useEffect(() => {
    if (!updateFacility.isPending && editingFacility) {
      // keep open until success callback fires
    }
  }, [updateFacility.isPending, editingFacility]);

  const handleAdd = (data: FacilityFormData) => {
    addFacility.mutate(data, {
      onSuccess: () => {
        toast.success("Facility added");
        setShowAddForm(false);
      },
      onError: () => toast.error("Failed to add facility"),
    });
  };

  const handleEdit = (data: FacilityFormData) => {
    if (!editingFacility) return;
    updateFacility.mutate(
      { id: editingFacility.id, data },
      {
        onSuccess: () => {
          toast.success("Facility updated");
          setEditingFacility(null);
        },
        onError: () => toast.error("Failed to update facility"),
      },
    );
  };

  const handleToggle = (facility: Facility) => {
    setIsTogglingId(facility.id);
    updateFacility.mutate(
      { id: facility.id, data: { active: !facility.active } },
      {
        onSuccess: () => {
          toast.success(
            `Facility ${facility.active ? "deactivated" : "activated"}`,
          );
          setIsTogglingId(null);
        },
        onError: () => {
          toast.error("Failed to update facility");
          setIsTogglingId(null);
        },
      },
    );
  };

  const handleDelete = () => {
    if (!deletingFacility) return;
    deleteFacility.mutate(deletingFacility.id, {
      onSuccess: () => {
        toast.success("Facility deleted");
        setDeletingFacility(null);
      },
      onError: () => {
        toast.error("Failed to delete facility");
      },
    });
  };

  if (isLoading) return <LoadingSpinner size="lg" fullPage />;
  if (error)
    return (
      <ErrorMessage
        message="Could not load facilities"
        onRetry={() => refetch()}
      />
    );

  return (
    <div className="px-4 py-6 space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-2">
        <div>
          <h1
            className="font-display text-xl font-bold text-foreground"
            data-ocid="admin-facilities-title"
          >
            Facilities
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">
            {facilities.filter((f) => f.active).length} active ·{" "}
            {facilities.length} total
          </p>
        </div>
        <button
          type="button"
          className="btn-primary flex items-center gap-1.5 text-sm whitespace-nowrap"
          onClick={() => {
            setShowAddForm(true);
            setEditingFacility(null);
          }}
          data-ocid="add-facility-btn"
        >
          <Plus className="w-4 h-4" />
          Add Facility
        </button>
      </div>

      {/* Add form */}
      {showAddForm && (
        <div className="form-card border-primary/30 bg-primary/5 space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="font-display font-semibold text-sm text-foreground">
              New Facility
            </h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowAddForm(false)}
              aria-label="Close"
              className="w-7 h-7"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
          <FacilityForm
            mode="add"
            onSubmit={handleAdd}
            onCancel={() => setShowAddForm(false)}
            isPending={addFacility.isPending}
          />
        </div>
      )}

      {/* Edit modal */}
      {editingFacility && (
        <dialog
          open
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/20 backdrop-blur-sm border-0 max-w-none w-full h-full m-0"
        >
          <div className="form-card w-full max-w-sm shadow-elevated">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-semibold text-foreground">
                Edit Facility
              </h2>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setEditingFacility(null)}
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <FacilityForm
              mode="edit"
              initial={{
                name: editingFacility.name,
                description: editingFacility.description,
              }}
              onSubmit={handleEdit}
              onCancel={() => setEditingFacility(null)}
              isPending={updateFacility.isPending}
            />
          </div>
        </dialog>
      )}

      {/* List */}
      {facilities.length === 0 ? (
        <div
          className="flex flex-col items-center justify-center py-16 gap-3 text-center"
          data-ocid="empty-state-facilities"
        >
          <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
            <Star className="w-6 h-6 text-muted-foreground" />
          </div>
          <p className="text-sm text-muted-foreground">No facilities yet</p>
          <button
            type="button"
            className="btn-primary text-sm"
            onClick={() => setShowAddForm(true)}
          >
            Add first facility
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {facilities.map((facility) => (
            <FacilityCard
              key={facility.id}
              facility={facility}
              onEdit={(f) => {
                setEditingFacility(f);
                setShowAddForm(false);
              }}
              onDelete={setDeletingFacility}
              onToggle={handleToggle}
              isTogglingId={isTogglingId}
            />
          ))}
        </div>
      )}

      {/* Delete confirm dialog */}
      {deletingFacility && (
        <DeleteConfirm
          name={deletingFacility.name}
          onConfirm={handleDelete}
          onCancel={() => setDeletingFacility(null)}
          isPending={deleteFacility.isPending}
        />
      )}
    </div>
  );
}
