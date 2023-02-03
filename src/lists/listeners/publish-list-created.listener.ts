import { ListGatewayInterface } from "../gateways/list-gateway-interface";
import { ListCreatedEvent } from "../events/list-created.events";
import { Inject, Injectable } from "@nestjs/common";
import { OnEvent } from "@nestjs/event-emitter";
import { Queue } from "bull";
import { InjectQueue } from "@nestjs/bull";

@Injectable()
export class PublishListCreatedListener{

    constructor(
      @InjectQueue('default')
      private queue: Queue
    ){}

    @OnEvent('list.created')
    async handle(event: ListCreatedEvent){
      await this.queue.add('list.created', event)
      //  this.listIntegrationGateway.create(event.list);
    }
} 