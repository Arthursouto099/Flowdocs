import { FaArrowCircleLeft } from "react-icons/fa";
import Card from "./Card";

export default function Modal({ open, onClose, children }: { open: boolean; onClose: () => void; children: React.ReactNode }) {
  if (!open) return null; // não renderiza o modal se estiver fechado

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      {/* Fundo escurecido */}
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose} // clicou fora, fecha
      ></div>

      {/* Card centralizado */}
      <Card className="relative z-10  p-6 ">
        <div className={"cursor-pointer"} onClick={() => onClose()}><FaArrowCircleLeft/> </div>
        {children}
      </Card>
    </div>
  );
}
