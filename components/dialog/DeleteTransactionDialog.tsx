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
      <AlertDialogTrigger className='text-red-600 px-4 py-2 rounded-md hover:text-red-800 hover:scale-125 transition-all duration-200 ease-in-out '>
        <Trash2 className='w-4 h-4 mr-2' />
      </AlertDialogTrigger>

      <AlertDialogContent className='w-full max-w-md p-4 rounded-lg'>
        <AlertDialogHeader>
          <h2 className='text-xl font-semibold text-gray-900'>
            Confirmer la suppression
          </h2>
          <p className='text-gray-500'>
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
            className={`px-4 py-2 rounded-md bg-emerald-600 text-white hover:bg-emerald-700 ${
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
