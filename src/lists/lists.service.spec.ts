import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { ListGatewayInMemory } from './gateways/list-gateway-in-memory';
import { ListsService } from './lists.service';


const mockHttpService = {
  post: jest.fn().mockReturnValue(of(null))
}

describe('ListsService', () => {
  let service: ListsService;
  let listPersistenceGateway = new ListGatewayInMemory();
  let listIntegrationGateway = new ListGatewayInMemory();

  beforeEach(()=> {
    listPersistenceGateway = new ListGatewayInMemory()
    service = new ListsService(listPersistenceGateway, listIntegrationGateway)
  });

  it("Deve criar uma lista", async () =>{
    const list = await service.create({name:'Myist'});
    expect(listPersistenceGateway.items).toEqual([list])
    expect(listIntegrationGateway.items).toEqual([list])
  })

  /*
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ListsService],
    }).compile();

    service = module.get<ListsService>(ListsService);
  });

  it('should be defined', () => { 
    expect(service).toBeDefined();
  });
  */
});
