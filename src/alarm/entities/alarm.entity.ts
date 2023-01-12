import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('alarm')
export class Alarm {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({ 
        name: "id",
        unsigned: true 
    })
    @ApiProperty()
    alarmId: number;

    @ManyToOne(type => User, user => user.userId)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: false, unsigned: true })
    @ApiProperty()
    userId: number;

    @ManyToOne(type => User, parent => parent.userId)
    @JoinColumn({ name: 'parentId' })
    parent: User;

    @Column({ nullable: false, unsigned: true })
    @ApiProperty()
    parentId: number;

    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date;
    
}