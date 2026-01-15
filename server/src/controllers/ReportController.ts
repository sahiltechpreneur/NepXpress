import { Request, Response } from 'express';
import {
  generateExcelReport,
  generatePdfReport,
} from '../services/reports/paymentReport';

export const exportExcel = async (_req: Request, res: Response) => {
  await generateExcelReport(res);
};

export const exportPdf = async (_req: Request, res: Response) => {
  await generatePdfReport(res);
};
