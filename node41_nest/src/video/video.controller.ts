import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, UploadedFiles, UseGuards, HttpCode, Req, Headers } from '@nestjs/common';
import { VideoService } from './video.service';
import { CreateVideoDto } from './dto/create-video.dto';
import { FileUploadDto, FilesUploadDto, UpdateVideoDto } from './dto/update-video.dto';
import { VideoType } from './entities/video.entity';
import { video } from '@prisma/client';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiHeader, ApiHeaders, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';

@ApiBearerAuth()
@UseGuards(AuthGuard("jwt"))
@ApiTags("video")
@Controller('video')
export class VideoController {
  constructor(private readonly videoService: VideoService) { }

  
  @Post()
  create(@Body() createVideoDto: CreateVideoDto) {
    return this.videoService.create(createVideoDto);
  }

  // @ApiBearerAuth()
  // @UseGuards(AuthGuard("jwt"))
  @HttpCode(200)
  @Get("/get-video")
  findAll(@Req() req: Request) {

    let data = req.user;

    
    return this.videoService.findAll();
  }



  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.videoService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto) {
    return this.videoService.update(+id, updateVideoDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.videoService.remove(+id);
  }

  // yarn add @types/multer
  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FileUploadDto
  })
  @UseInterceptors(FileInterceptor("video", {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))
  @Post("/upload-video")
  uploadVideo(@UploadedFile() file: Express.Multer.File) {
    return file
  }



  @ApiConsumes("multipart/form-data")
  @ApiBody({
    type: FilesUploadDto
  })
  // upload nhiều file
  @UseInterceptors(FilesInterceptor("video", 5, {
    storage: diskStorage({
      destination: process.cwd() + "/public/img",
      filename: (req, file, callback) => callback(null, new Date().getTime() + "_" + file.originalname)
    })
  }))

  @Post("/upload-multi-image")
  uploadListImage(@UploadedFiles() files: Express.Multer.File[]) {
    return files;
  }


}
