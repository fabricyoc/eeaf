import DataTable from "../../ui/DataTable";

import {
  teacherAssignmentColumns
} from "../TeacherAssignmentColumns";

import TeacherAssignmentActions from "../TeacherAssignmentActions";

import styles from "./TeacherAssignmentsTable.module.css";


function TeacherAssignmentsTable({

  assignments,

  onDelete

}) {


  return (

    <div

      className={styles.container}

    >

      <DataTable


        columns={
          teacherAssignmentColumns
        }


        data={
          assignments
        }


        actions={
          (assignment) => (

            <TeacherAssignmentActions

              assignment={
                assignment
              }


              onDelete={
                onDelete
              }

            />

          )
        }


      />


    </div>

  );

}


export default TeacherAssignmentsTable;