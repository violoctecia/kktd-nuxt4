import admissionPlan from '~~/server/data/admission-plan.json';

export default defineEventHandler(() => {
	return admissionPlan;
});
