import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    padding: 24,
    backgroundColor: "#ffffff",
    fontFamily: "Helvetica",
  },

  header: {
    marginBottom: 12,
    borderBottom: "1px solid #e5e7eb",
    paddingBottom: 10,
  },

  logoWrapper: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
  },

  logo: {
    width: "80%",
  },

  title: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: "#074495",
    marginBottom: 4,
  },

  subtitle: {
    textAlign: "center",
    fontSize: 12,
    color: "#6b7280",
  },

  date: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 4,
  },

  grid: {
    marginTop: 16,
    border: "1px solid #e5e7eb",
  },

  row: {
    flexDirection: "row",
  },

  cell: {
    width: "20%",
    minHeight: 60,
    borderRight: "1px solid #e5e7eb",
    borderBottom: "1px solid #e5e7eb",
    padding: 6,
    justifyContent: "center",
    alignItems: "center",
  },

  lastCell: {
    borderRight: "none",
  },

  name: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#111827",
    textAlign: "center",
  },

  pos: {
    fontSize: 8,
    color: "#9ca3af",
    marginTop: 2,
  },

  empty: {
    fontSize: 9,
    color: "#9ca3af",
    fontStyle: "italic",
  },

  quadro: {
    marginTop: 12,
    backgroundColor: "#074495",
    padding: 10,
    textAlign: "center",
    color: "#ffffff",
    fontSize: 12,
    fontWeight: "bold",
    borderRadius: 4,
  },
});

function ClassroomPDF({ alunos = [], turma = "" }) {
  const linhas = 5;
  const colunas = 5;

  const dataImpressao = new Date().toLocaleDateString("pt-BR");

  const grid = [];

  for (let l = linhas; l >= 1; l--) {
    const row = [];

    for (let c = 1; c <= colunas; c++) {
      const posicao = `${l}${c}`;

      const aluno = alunos.find(
        (a) => String(a.posicao).trim() === posicao
      );

      row.push({
        posicao,
        nome: aluno?.nome || "",
      });
    }

    grid.push(row);
  }

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* CABEÇALHO */}
        <View style={styles.header}>

          <View style={styles.logoWrapper}>
            <Image
              src="/imagens/cabecalho.png"
              style={styles.logo}
            />
          </View>

          <Text style={styles.title}>
            Mapa de Sala
          </Text>

          <Text style={styles.subtitle}>
            Turma: {turma}
          </Text>

          <Text style={styles.date}>
            Data de emissão: {dataImpressao}
          </Text>

        </View>

        {/* GRID */}
        <View style={styles.grid}>
          {grid.map((row, i) => (
            <View key={i} style={styles.row}>
              {row.map((cell, index) => (
                <View
                  key={cell.posicao}
                  style={[
                    styles.cell,
                    index === colunas - 1 && styles.lastCell,
                  ]}
                >
                  {cell.nome ? (
                    <>
                      <Text style={styles.name}>
                        {cell.nome}
                      </Text>
                      <Text style={styles.pos}>
                        {cell.posicao}
                      </Text>
                    </>
                  ) : (
                    <Text style={styles.empty}>
                      Livre
                    </Text>
                  )}
                </View>
              ))}
            </View>
          ))}
        </View>

        {/* QUADRO */}
        <View style={styles.quadro}>
          <Text>QUADRO</Text>
        </View>

      </Page>
    </Document>
  );
}

export default ClassroomPDF;