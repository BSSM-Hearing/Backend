import { ApiProperty } from '@nestjs/swagger/dist/decorators/api-property.decorator';
import { User } from 'src/user/entities/user.entity';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, CreateDateColumn } from 'typeorm';

@Entity('dialog')
export class Dialog {

    @PrimaryGeneratedColumn('increment')
    @PrimaryColumn({ 
        name: "id",
        unsigned: true 
    })
    @ApiProperty()
    dialogId: number;

    @ManyToOne(type => User, user => user.userId)
    @JoinColumn({ name: 'userId' })
    user: User;

    @Column({ nullable: false, unsigned: true })
    @ApiProperty()
    userId: number;
    
    @Column({ type: 'int', default: null })
    @ApiProperty()
    hash: number;
    
    @Column({
        length: 1000,
        nullable: false
    })
    @ApiProperty()
    content: string;

    @CreateDateColumn()
    @ApiProperty()
    createdAt: Date;
    
}