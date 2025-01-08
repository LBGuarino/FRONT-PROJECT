export const catchedController = (controller: any) => {
    return async (req: any, res: any, next: any) => {
        console.log(req.body);
        try {
            await controller(req, res);
        } catch (error) {
            next(error);
        }
    };
};