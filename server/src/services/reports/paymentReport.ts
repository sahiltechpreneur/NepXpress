import ExcelJS from 'exceljs';
import PDFDocument from 'pdfkit';
import Courier from '../../models/Courier';
import { Response } from 'express';

export const generateExcelReport = async (res: Response) => {
  const couriers = await Courier.findAll();

  const workbook = new ExcelJS.Workbook();
  const sheet = workbook.addWorksheet('Payments');

  sheet.columns = [
    { header: 'Tracking No', key: 'trackingNumber', width: 20 },
    { header: 'Sender', key: 'senderName', width: 20 },
    { header: 'Receiver', key: 'receiverName', width: 20 },
    { header: 'Status', key: 'status', width: 15 },
    { header: 'Payment', key: 'paymentStatus', width: 15 },
    { header: 'Date', key: 'createdAt', width: 20 },
  ];

  couriers.forEach((c: any) => {
    sheet.addRow({
      trackingNumber: c.trackingNumber,
      senderName: c.senderName,
      receiverName: c.receiverName,
      status: c.status,
      paymentStatus: c.paymentStatus,
      createdAt: c.createdAt,
    });
  });

  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=payment-report.xlsx'
  );

  await workbook.xlsx.write(res);
  res.end();
};

export const generatePdfReport = async (res: Response) => {
  const couriers = await Courier.findAll();

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=payment-report.pdf'
  );

  doc.pipe(res);

  doc.fontSize(18).text('NepXpress Payment Report', {
    align: 'center',
  });
  doc.moveDown();

  couriers.forEach((c: any) => {
    doc
      .fontSize(10)
      .text(
        `${c.trackingNumber} | ${c.senderName} → ${c.receiverName} | ${c.status} | ${c.paymentStatus}`
      );
  });

  doc.end();
};
