import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { HeroServiceForLab } from './hero.lab.service';
import { Hero } from '../../hero';

describe("3-hero service (http) integration testing:", () => {
    let service: HeroServiceForLab;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HeroServiceForLab]
    });

    service = TestBed.inject(HeroServiceForLab);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); 
  });
  it("getHeroes function: send request and receive response successfully", () => {
    const mockHeroes: Hero[] = [
      { id: 1, name: 'Arsany' ,strength : 1 },
      { id: 2, name: 'Asaph', strength :2}
    ];
  
    service.getHeroes().subscribe(
      (heroes: Hero[]) => {
        expect(heroes).toEqual(mockHeroes); 
        
      },
      (error: any) => {
        fail('Failed to get heroes: ' + error); 
      }
    );
  
    const req = httpMock.expectOne('http://localhost:3000/heroes'); 
    expect(req.request.method).toBe('GET'); 
  
    req.flush(mockHeroes); 
  });
  
    it("updateHero function: send request and receive response successfully", () => {
        const updatedHero: Hero = { id: 1, name: 'Youssab' ,strength:2};

    service.updateHero(updatedHero).subscribe(response => {
      expect(response).toBeDefined(); 
    });

    const req = httpMock.expectOne('http://localhost:3000/heroes'); 
    expect(req.request.method).toBe('PUT'); 
    req.flush({}); 
  });
     
})