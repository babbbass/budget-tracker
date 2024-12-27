import React, { useState } from "react"
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog"
import { deleteTransaction } from "@/lib/actionsTransaction"
import { toast } from "sonner"
import { Trash2 } from "lucide-react"

export function DeleteTransactionDialog({
  idTransaction,
  onSuccess,
}: {
  idTransaction: string
  onSuccess: () => void
}) {
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    setLoading(true)
    const success = await deleteTransaction(idTransaction)
    if (success) {
      toast.success("transaction supprimée avec succès !")
    } else {
      toast.error("Erreur lors de la suppression.")
    }
    onSuccess()
    setLoading(false)
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger className='text-red-600 px-1 py-2 rounded-md hover:text-red-800 hover:scale-125 transition-all duration-200 ease-in-out '>
        <Trash2 className='w-4 h-4' />
      </AlertDialogTrigger>

      <AlertDialogContent className='w-full max-w-md p-4 rounded-lg bg-emerald-900 text-slate-50 font-sans'>
        <AlertDialogHeader>
          <h2 className='text-xl font-title'>Confirmer la suppression</h2>
          <p>
            Êtes-vous sûr de vouloir supprimer cette entrée ? Cette action est
            irréversible.
          </p>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel className='px-4 py-2 rounded-md border border-gray-300 text-gray-700 hover:bg-gray-100'>
            Annuler
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleDelete}
            disabled={loading}
            className={`px-4 py-2 rounded-md bg-primary text-slate-50 hover:bg-primary/90 ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
          >
            {loading ? "Suppression..." : "Confirmer"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
