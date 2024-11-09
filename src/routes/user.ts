import UserController from '../controllers/user.controllers';
import { Router } from 'express';
import { Container } from 'typedi';
import { checkUserJwt } from '../middlewares/checkUserJwt';


// We use typedi to get instances of the controllers (i.e the decorated classes [with @Service()])
const userController = Container.get(UserController);

// We use express.Router() to create a new router object
const router = Router();

router.get('/', userController.getAllUsers);

// * POST /register: Allows users to create new account
router.post('/register',  userController.createUser);

// * POST /login: Allows users to login to their account
router.post('/login', userController.loginUser);

router.get('/:id', userController.getUserById);

router.patch('/:id', checkUserJwt, userController.updateUser);

router.delete('/:id', checkUserJwt, userController.deleteUser);

export default router;