export const createPdfTheme = (doc, options = {}) => {
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  const marginX = 18;
  const bottomMargin = 16;
  const contentWidth = pageWidth - marginX * 2;
  const accent = options.accent || [250, 129, 18];
  const dark = [28, 28, 28];
  const lightText = [250, 243, 225];
  const bodyText = [50, 50, 50];
  const labelText = [100, 100, 100];
  const borderLight = [235, 228, 215];

  let y = 50;

  const drawHeader = (continued = false) => {
    doc.setFillColor(...dark);
    doc.rect(0, 0, pageWidth, 40, "F");

    doc.setTextColor(...accent);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.text(options.title || "SMART PARK REPORT", marginX, 18);

    doc.setTextColor(...lightText);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);

    const subtitle = continued
      ? `${options.subtitle || "Operational snapshot"} (continued)`
      : options.subtitle || "Operational snapshot";
    doc.text(subtitle, marginX, 28);

    if (!continued && options.generatedAt) {
      const generatedText = `Generated: ${options.generatedAt}`;
      const textWidth = doc.getTextWidth(generatedText);
      doc.text(generatedText, pageWidth - marginX - textWidth, 28);
    }

    // Bottom border of header
    doc.setDrawColor(...accent);
    doc.setLineWidth(0.5);
    doc.line(marginX, 41, pageWidth - marginX, 41);

    y = 50;
  };

  const ensureSpace = (requiredHeight = 10) => {
    if (y + requiredHeight <= pageHeight - bottomMargin) {
      return;
    }

    doc.addPage();
    drawHeader(true);
  };

  const addSpacer = (space = 6) => {
    y += space;
  };

  const addMeta = (items = []) => {
    if (!items.length) return;

    ensureSpace(items.length * 8 + 4);

    doc.setFillColor(250, 247, 240);
    doc.rect(marginX, y - 2, contentWidth, items.length * 8 + 4, "F");
    doc.setDrawColor(...borderLight);
    doc.setLineWidth(0.3);
    doc.rect(marginX, y - 2, contentWidth, items.length * 8 + 4);

    items.forEach((item, idx) => {
      doc.setTextColor(...labelText);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.text(String(item.label || "Field"), marginX + 4, y + 2);

      const safeValue = item.value == null || item.value === "" ? "N/A" : String(item.value);
      doc.setTextColor(...bodyText);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      const valueWidth = contentWidth * 0.5;
      const valueLines = doc.splitTextToSize(safeValue, valueWidth);
      doc.text(valueLines, marginX + contentWidth * 0.45, y + 2, { align: "left" });

      if (idx < items.length - 1) {
        doc.setDrawColor(...borderLight);
        doc.setLineWidth(0.2);
        doc.line(marginX + 2, y + 6.5, pageWidth - marginX - 2, y + 6.5);
      }

      y += 8;
    });

    y += 2;
  };

  const addSection = (title) => {
    ensureSpace(14);
    addSpacer(4);

    doc.setFillColor(...accent);
    const sectionHeight = 8;
    doc.rect(marginX, y - 2, contentWidth, sectionHeight, "F");

    doc.setTextColor(...lightText);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(11);
    doc.text(String(title || "Section"), marginX + 4, y + 3);

    y += sectionHeight + 4;
  };

  const addKeyValue = (label, value) => {
    ensureSpace(10);

    // Row background
    if (Math.floor(y / 2) % 2 === 0) {
      doc.setFillColor(252, 250, 247);
      doc.rect(marginX, y - 3, contentWidth, 8, "F");
    }

    // Border
    doc.setDrawColor(...borderLight);
    doc.setLineWidth(0.2);
    doc.line(marginX, y + 5, pageWidth - marginX, y + 5);

    doc.setTextColor(...labelText);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    const labelWidth = contentWidth * 0.35;
    const labelLines = doc.splitTextToSize(String(label || "Field"), labelWidth);
    doc.text(labelLines, marginX + 3, y);

    const safeValue = value == null || value === "" ? "N/A" : String(value);
    doc.setTextColor(...bodyText);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    const valueWidth = contentWidth * 0.6;
    const valueLines = doc.splitTextToSize(safeValue, valueWidth);
    doc.text(valueLines, marginX + contentWidth * 0.38, y, { align: "left" });

    const rowHeight = Math.max(8, labelLines.length * 4 + 2);
    y += rowHeight;
  };

  const addParagraph = (text) => {
    const safeText = text == null || text === "" ? "N/A" : String(text);
    const lines = doc.splitTextToSize(safeText, contentWidth - 6);
    ensureSpace(lines.length * 5 + 8);

    doc.setFillColor(250, 247, 240);
    doc.rect(marginX, y - 2, contentWidth, lines.length * 5 + 6, "F");
    doc.setDrawColor(...borderLight);
    doc.setLineWidth(0.3);
    doc.rect(marginX, y - 2, contentWidth, lines.length * 5 + 6);

    doc.setTextColor(...bodyText);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.text(lines, marginX + 3, y + 2, { maxWidth: contentWidth - 6 });
    y += lines.length * 5 + 8;
  };

  const addTableHeader = (columns) => {
    ensureSpace(12);
    addSpacer(2);

    doc.setFillColor(...accent);
    doc.rect(marginX, y - 2, contentWidth, 8, "F");

    doc.setTextColor(...lightText);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);

    columns.forEach((col) => {
      doc.text(col.label, marginX + col.x + 2, y + 3);
    });

    y += 10;
  };

  const addTableRow = (columns, rowHeight = 7) => {
    ensureSpace(rowHeight + 2);

    // Alternating row background
    if (Math.floor(y / 2) % 2 === 0) {
      doc.setFillColor(252, 250, 247);
      doc.rect(marginX, y - 3, contentWidth, rowHeight + 2, "F");
    }

    doc.setTextColor(...bodyText);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);

    columns.forEach((col) => {
      const value = col.value == null || col.value === "" ? "-" : String(col.value);
      const lines = doc.splitTextToSize(value, col.width - 2);
      doc.text(lines[0] || "-", marginX + col.x + 2, y + 2);
    });

    // Row divider
    doc.setDrawColor(...borderLight);
    doc.setLineWidth(0.2);
    doc.line(marginX, y + rowHeight, pageWidth - marginX, y + rowHeight);

    y += rowHeight;
  };

  const addColoredTableRow = (columns, transactionType = "debit", rowHeight = 7) => {
    ensureSpace(rowHeight + 2);

    // Color background based on transaction type
    const isCredit = transactionType?.toLowerCase() === "credit";
    if (isCredit) {
      doc.setFillColor(230, 250, 240); // Light green for credit
    } else {
      doc.setFillColor(255, 240, 245); // Light red for debit
    }
    doc.rect(marginX, y - 3, contentWidth, rowHeight + 2, "F");

    // Left colored indicator bar
    const indicatorColor = isCredit ? [46, 160, 96] : [220, 38, 38]; // Green or Red
    doc.setFillColor(...indicatorColor);
    doc.rect(marginX - 2, y - 3, 3, rowHeight + 2, "F");

    doc.setTextColor(...bodyText);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);

    columns.forEach((col) => {
      const value = col.value == null || col.value === "" ? "-" : String(col.value);
      const lines = doc.splitTextToSize(value, col.width - 2);
      
      // Color the amount column if it's the amount field
      if (col.isAmount) {
        doc.setTextColor(...indicatorColor);
        doc.setFont("helvetica", "bold");
      } else {
        doc.setTextColor(...bodyText);
        doc.setFont("helvetica", "normal");
      }
      
      doc.text(lines[0] || "-", marginX + col.x + 2, y + 2);
    });

    // Row divider
    doc.setDrawColor(...borderLight);
    doc.setLineWidth(0.2);
    doc.line(marginX, y + rowHeight, pageWidth - marginX, y + rowHeight);

    y += rowHeight;
  };

  drawHeader(false);

  return {
    addMeta,
    addSection,
    addKeyValue,
    addParagraph,
    addTableHeader,
    addTableRow,
    addColoredTableRow,
    addSpacer,
    save: (fileName) => doc.save(fileName),
  };
};
