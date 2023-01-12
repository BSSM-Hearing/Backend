import { UserRole } from 'src/common/enums/UserRole';
import { User } from 'src/user/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('score')
export class Score {

    @ApiProperty()
    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({ 
        name: "id",
        unsigned: true 
    })
    scoreId: number;
    
    @ApiProperty()
    @ManyToOne(type => User, user => user.userId)
    @JoinColumn({ name: 'userId' })
    user: User;
    
    @ApiProperty()
    @Column({ nullable: false, unsigned: true })
    userId: number;
    
    @ApiProperty()
    @Column({ type: 'int', default: null })
    score: number;
    
    @ApiProperty()
    @CreateDateColumn()
    createdAt: Date;
    
}