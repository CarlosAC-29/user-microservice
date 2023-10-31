import { IsString, IsNotEmpty } from "class-validator";

export class createUserDto{
    @IsNotEmpty()
    @IsString()
    
    username: string;
    @IsNotEmpty()
    @IsString()

    password: string;
    @IsNotEmpty()
    @IsString()
    email: string;
}

export class updateUserDto{
    @IsNotEmpty()
    @IsString()
    username: string;
    
    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    email: string;
}
