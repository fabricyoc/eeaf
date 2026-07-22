import {
  useState,
  useMemo
} from "react";
import {
  FaChevronLeft,
  FaChevronRight
} from "react-icons/fa";
import styles from "./DataTable.module.css";
function DataTable({
  columns = [],
  data = [],
  loading = false,
  emptyMessage = "Nenhum registro encontrado.",
  actions,
  onRowClick,
  rowClassName,
  pagination = true,
  pageSize = 5
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(
    data.length / pageSize
  );
  const paginatedData = useMemo(() => {
    if (!pagination) {
      return data;
    }
    const start =
      (page - 1) * pageSize;
    return data.slice(
      start,
      start + pageSize
    );
  }, [
    data,
    page,
    pageSize,
    pagination
  ]);
  function changePage(newPage) {
    if (
      newPage < 1 ||
      newPage > totalPages
    ) {
      return;
    }
    setPage(newPage);
  }
  if (loading) {
    return (
      <div className={styles.empty}>
        Carregando...
      </div>
    );
  }
  return (
    <div className={styles.wrapper}>
      <table className={styles.table}>
        <thead>
          <tr>
            {
              columns.map(column => (
                <th
                  key={column.key}
                  style={{
                    width: column.width,
                    textAlign:
                      column.align ?? "left"
                  }}
                >
                  {column.label}
                </th>
              ))
            }
            {
              actions && (
                <th
                  className={
                    styles.actionsColumn
                  }
                >
                  Ações
                </th>
              )
            }
          </tr>
        </thead>
        <tbody>
          {
            paginatedData.length === 0
              ?
              (
                <tr>
                  <td
                    colSpan={
                      columns.length +
                      (actions ? 1 : 0)
                    }
                    className={styles.empty}
                  >
                    {emptyMessage}
                  </td>
                </tr>
              )
              :
              (
                paginatedData.map(row => (
                  <tr
                    key={row.id}
                    className={
                      rowClassName
                        ?
                        rowClassName(row)
                        :
                        ""
                    }
                    onClick={() => {
                      onRowClick?.(row);
                    }}
                  >
                    {
                      columns.map(column => (
                        <td
                          key={column.key}
                          style={{
                            textAlign:
                              column.align ?? "left"
                          }}
                        >
                          {
                            column.render
                              ?
                              column.render(row)
                              :
                              row[column.key]
                          }
                        </td>
                      ))
                    }
                    {
                      actions && (
                        <td
                          className={
                            styles.actions
                          }
                          onClick={
                            e =>
                              e.stopPropagation()
                          }
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
      {
        pagination &&
        totalPages > 1 &&
        (
          <div className={styles.pagination}>
            <button
              disabled={
                page === 1
              }
              onClick={() =>
                changePage(page - 1)
              }
            >
              <FaChevronLeft />
            </button>
            <span>
              Página {page} de {totalPages}
            </span>
            <button
              disabled={
                page === totalPages
              }
              onClick={() =>
                changePage(page + 1)
              }
            >
              <FaChevronRight />
            </button>
          </div>
        )
      }
    </div>
  );
}
export default DataTable;