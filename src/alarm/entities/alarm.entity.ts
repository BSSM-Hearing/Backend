import { UserRole } from 'src/common/enums/UserRole';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('alarm')
export class Alarm {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({ 
        name: "id",
        unsigned: true 
    })
    alarmId: number;

    @ManyToOne(type => User, user => user.userId)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: false, unsigned: true })
    userId: number;

    @ManyToOne(type => User, parent => parent.userId)
    @JoinColumn({ name: 'parentId' })
    parent: User;

    @Column({ nullable: false, unsigned: true })
    parentId: number;

    @CreateDateColumn()
    createdAt: Date;
    
}