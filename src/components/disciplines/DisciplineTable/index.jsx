import DataTable from "../../ui/DataTable";

import { disciplineColumns } from "../DisciplineColumns";
import DisciplineActions from "../DisciplineActions";

import styles from "./DisciplineTable.module.css";

function DisciplineTable({
  disciplines,
  onEdit,
  onManageClassrooms,
  onDelete
}) {

  return (
    <div className={styles.container}>

      <DataTable
        columns={disciplineColumns}
        data={disciplines}
        actions={(disciplina) => (

          <DisciplineActions
            disciplina={disciplina}
            onEdit={onEdit}
            onManageClassrooms={onManageClassrooms}
            onDelete={onDelete}
          />

        )}
      />

    </div>
  );

}

export default DisciplineTable;