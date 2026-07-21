import styles from "./DataTable.module.css";

function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "Nenhum registro encontrado.",
  actions,
  onRowClick,
  rowClassName
}){
  if(loading){
    return(
      <div className={styles.empty}>
        Carregando...
      </div>
    );
  }
  return(
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {
              columns.map(column=>(
                <th
                  key={column.key}
                  style={{
                    width:column.width,
                    textAlign:column.align ?? "left"
                  }}
                  className={
                    column.sortable
                      ? styles.sortable
                      : ""
                  }
                >
                  {column.label}
                </th>
              ))
            }
            {
              actions && (
                <th
                  className={styles.actionsColumn}
                >
                  Ações
                </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            data.length===0
              ?(
                <tr>
                  <td
                    colSpan={
                      columns.length+
                      (actions?1:0)
                    }
                    className={styles.empty}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )
              :(
                data.map(row=>(
                  <tr
                    key={row.id}
                    className={
                      rowClassName
                        ? rowClassName(row)
                        : ""
                    }
                    onClick={()=>{
                      if(onRowClick){
                        onRowClick(row);
                      }
                    }}
                  >
                    {
                      columns.map(column=>(
                        <td
                          key={column.key}
                          style={{
                            textAlign:
                              column.align ?? "left"
                          }}
                        >
                          {
                            column.render
                              ? column.render(row)
                              : row[column.key]
                          }
                        </td>
                      ))
                    }
                    {
                      actions && (
                        <td
                          className={styles.actions}
                          onClick={e=>e.stopPropagation()}
                        >
                          {actions(row)}
                        </td>
                      )
                    }
                  </tr>
                ))
              )
          }
        </tbody>
      </table>
    </div>
  );
}
export default DataTable;