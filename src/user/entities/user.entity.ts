import { UserRole } from 'src/common/enums/UserRole';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';

@Entity('user')
export class User {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({ 
        name: "id",
        unsigned: true 
    })
    userId: number;

    @Column({
        type: "enum",
        enum: UserRole,
        default: UserRole.GUARDIAN
    })
    role: UserRole;

    @Column({
        nullable: false,
        length: 20
    })
    nickname: string;

    @Column({
        length: 20,
        nullable: false
    })
    email: string;

    @Column({
        length: 200,
        nullable: false
    })
    password: string;

    @ManyToOne(type => User, user => user.parentUser)
    @JoinColumn({ name: 'parentId' })
    parentUser: User;

    @Column({ 
        nullable: true,
        unsigned: true 
    })
    parentId: number | null;

    @OneToMany(type => User, user => user.childUser)
    childUser: User[];
    
}