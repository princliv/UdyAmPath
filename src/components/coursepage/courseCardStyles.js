export const courseCardStyles = {
  sectionWrap: {
    display: "flex",
    justifyContent: "flex-end",
    marginBottom: "20px",
  },
  sectionPanel: {
    width: "100%",
    padding: "24px",
    borderRadius: "16px",
    border: "1px solid rgba(124, 107, 255, 0.18)",
    boxShadow: "0 10px 28px rgba(124, 107, 255, 0.12)",
  },
  heading: {
    marginBottom: "10px",
    fontSize: "25px",
    fontWeight: "700",
    color: "#2f225b",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    padding: "12px 0",
    borderRadius: "10px",
  },
  card: {
    background: "rgba(255,255,255,0.55)",
    border: "1px solid rgba(124,107,255,0.25)",
    padding: "14px",
    display: "flex",
    flexDirection: "column",
    gap: "14px",
    height: "100%",
    minHeight: "260px",
  },
  imageWrap: {
    flex: 1,
    overflow: "hidden",
    borderRadius: "12px",
  },
  image: {
    width: "100%",
    height: "150px",
    objectFit: "cover",
    borderRadius: "12px",
  },
  metaRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "12px",
    color: "#51456f",
  },
  title: {
    fontSize: "18px",
    fontWeight: "700",
    margin: "10px 0",
    color: "#2f225b",
  },
  detailsButton: {
    backgroundColor: "var(--course-primary)",
    color: "white",
    border: "none",
    padding: "7px 12px",
    borderRadius: "8px",
    cursor: "pointer",
    alignSelf: "flex-start",
    fontWeight: "600",
  },
  viewMoreWrap: {
    gridColumn: "1 / -1",
    textAlign: "left",
  },
  viewMoreButton: {
    padding: "7px 12px",
    backgroundColor: "white",
    color: "var(--course-primary)",
    border: "2px solid var(--course-primary)",
    borderRadius: "10px",
    cursor: "pointer",
    fontSize: "12px",
    fontWeight: "600",
  },
};

export const getSectionPanelStyle = (backgroundColor = "rgba(237,233,254,0.75)") => ({
  ...courseCardStyles.sectionPanel,
  background: backgroundColor,
});
