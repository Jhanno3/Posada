import { Modal } from "@/components/ui/modal";
import { ModalCloseButton } from "@/components/ui/modal-close-button";
import { ClientSidebar } from "@/components/layout/client-sidebar";

export function AccountModalShell({ children }: { children: React.ReactNode }) {
  return (
    <Modal className="max-w-4xl">
      <div className="flex h-[85vh] max-h-[720px]">
        <ClientSidebar replace />
        <div className="relative flex-1 overflow-y-auto bg-stone-50 p-8">
          <div className="absolute right-4 top-4">
            <ModalCloseButton />
          </div>
          {children}
        </div>
      </div>
    </Modal>
  );
}
