import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from './dto/create-video.dto';
import { UpdateVideoDto } from './dto/update-video.dto';
import { PrismaClient, video, video_type } from '@prisma/client';
import { VideoType } from './entities/video.entity';
import { ConfigService } from '@nestjs/config';



@Injectable()
export class VideoService {

  constructor(private configService: ConfigService) { }

  prisma = new PrismaClient()

  create(createVideoDto: CreateVideoDto) {
    return 'This action adds a new video';
  }

  async findAll(): Promise<video[]> {
    let data: video[] = await this.prisma.video.findMany();

    return data;
    return this.configService.get("TITLE");
  }

  findOne(id: number) {
    return `This action returns a #${id} video`;
  }

  update(id: number, updateVideoDto: UpdateVideoDto) {
    return `This action updates a #${id} video`;
  }

  remove(id: number) {
    return `This action removes a #${id} video`;
  }
}
