import {Chunk} from "../../entities/chunk";
import {HttpService} from "../http/http.service";
import {TicketService} from "../ticket/ticket.service";
import {MediaService} from "../media/media.service";
/**
 * Created by kfaulhaber on 30/06/2017.
 */


export class UploadService {

    constructor(
        public mediaService: MediaService,
        public ticketService: TicketService
    ){}

        public send<T>(chunk: Chunk): Promise<T>{
        console.log(chunk.content, chunk.contentRange);
        return new HttpService("PUT", this.ticketService.ticket.uploadLinkSecure, chunk.content, {
            'Content-Type': this.mediaService.media.file.type,
            'Content-Range': chunk.contentRange
        }).send(true);
    }

    public getRange<T>(): Promise<T>{
        return new HttpService("PUT", this.ticketService.ticket.uploadLinkSecure, null, {
            'Content-Type': this.mediaService.media.file.type,
            'Content-Range': 'bytes */* '
        }).send();
    }
}