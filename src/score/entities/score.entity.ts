import { UserRole } from 'src/common/enums/UserRole';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('score')
export class Score {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({ 
        name: "id",
        unsigned: true 
    })
    scoreId: number;

    @ManyToOne(type => User, user => user.userId)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: false, unsigned: true })
    userId: number;

    @Column({ type: 'int', default: null })
    score: number;

    @CreateDateColumn()
    createdAt: Date;
    
}