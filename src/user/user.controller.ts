import { Controller, Get, Post, Put, Delete, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { createUserDto, updateUserDto } from '../dto/User.dto';
import { userInfo } from 'os';

@Controller('user')
export class UserController {
    constructor(private readonly firebaseService: UserService) { }

    //Endpoint para obtener un usuario
    @Get('login/:id')
    async getUser(@Param('id') id: string) {
        const collectionName = 'users';
        const user = await this.firebaseService.getUser(collectionName, id);
        if(!user){
            throw new HttpException({
                message: 'User not found',
            }, HttpStatus.NOT_FOUND);
        }
        return { user };
    }

    //Endpoint para obtener todos los usuarios
    @Get()
    async getUsers() {
        const collectionName = 'users';
        const users = await this.firebaseService.getUsers(collectionName);
        return { users };
    }

    //Endpoint para actualizar un usuario
    @Put('updateUser/:id')
    async updateUser(@Param('id') id: string, @Body() updatedData: updateUserDto) {
        const collectionName = 'users';
        const update = await this.firebaseService.updateUser(collectionName, id, updatedData);
        if (!update) {
            throw new HttpException({
                message: 'User not found',
            }, HttpStatus.NOT_FOUND);
        }
        return { message: 'User updated successfully' };
    }

    //Endpoint para crear un usuario
    @Post('adduser')
    async createUser(@Body() data: createUserDto) {
        const collectionName = 'users';
        await this.firebaseService.createUser(collectionName, data);
        return { message: 'User created successfully' };
    }

    //Endpouiint para eliminar un usuario
    @Delete('deleteUser/:id')
    async deleteRecord(@Param('id') id: string) {
        const collectionName = 'users'; 
        const deleted = await this.firebaseService.deleteUser(collectionName, id);
        if (!deleted) {
            throw new HttpException({ message: 'Usuario no encontrado' }, HttpStatus.NOT_FOUND);
        }
        return { message: 'Usuario eliminado exitosamente' };
    }

    @Post('login')
    async verifyCredentials(@Body() credentials: { username: string, password: string }) {
        const collectionName = 'users';
    
        // Verifica las credenciales
        const isVerified = await this.firebaseService.verifyCredentials(
            collectionName,
            credentials.username,
            credentials.password,
        );
    
        if (isVerified) {
            // return { message: 'Credenciales válidas' };
            // retorna los datos del usuario y el token

            const user = await this.firebaseService.getUserByUsername(collectionName, credentials.username);
            return { user };

            // retorna el usuario jwtoken
            // const user = await this.firebaseService.getUserByUsername(collectionName, credentials.username);
            // const token = await this.firebaseService.generateJWT(user);
            // return { token };

        } else {
            throw new HttpException({
                message: 'Credenciales inválidas',
            }, HttpStatus.UNAUTHORIZED);
        }
    }

}
