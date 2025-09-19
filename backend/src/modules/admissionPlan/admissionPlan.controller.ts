import type { Request, Response } from 'express';
import { AdmissionPlanService } from './admissionPlan.service';

export const getAdmissionPlan = async (req: Request, res: Response) => {
	const { year, specialtyId } = req.query;

	const filter: any = {};
	if (year) filter.year = Number(year);
	if (specialtyId) filter.specialtyId = Number(specialtyId);

	const items = await AdmissionPlanService.getAll(Object.keys(filter).length ? filter : undefined);
	res.json(items);
};

export const createAdmissionPlan = async (req: Request, res: Response) => {
	const newItem = await AdmissionPlanService.create(req.body);
	res.status(201).json(newItem);
};

export const updateAdmissionPlan = async (req: Request, res: Response) => {
	const { id } = req.params;
	const updated = await AdmissionPlanService.update(Number(id), req.body);
	res.json(updated);
};

export const deleteAdmissionPlan = async (req: Request, res: Response) => {
	const { id } = req.params;
	await AdmissionPlanService.delete(Number(id));
	res.status(204).send();
};
