import { PDFDownloadLink } from "@react-pdf/renderer";
import ClassroomPDF from "../ClassroomPDF";

import styles from "./PrintClassroomButton.module.css";

function PrintClassroomButton({ alunos, turma }) {

  if (!alunos || alunos.length === 0) {
    return (
      <button className={styles.button} disabled>
        Sem dados para exportar
      </button>
    );
  }

  return (
    <PDFDownloadLink
      document={
        <ClassroomPDF
          alunos={alunos}
          turma={turma}
        />
      }
      fileName={`mapa-${turma || "sala"}.pdf`}
      className={styles.button}
    >
      {({ loading }) =>
        loading
          ? "Gerando PDF..."
          : "📄 Exportar PDF"
      }
    </PDFDownloadLink>
  );
}

export default PrintClassroomButton;
