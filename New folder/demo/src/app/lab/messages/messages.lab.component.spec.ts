import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MessagesComponentForLab } from './messages.lab.component';
import { MessageService } from '../../services/message/message.service';



describe("2-message component integration testing:", () => {
   
    let component: MessagesComponentForLab;
  let fixture: ComponentFixture<MessagesComponentForLab>;
  let messageService: MessageService;

 

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesComponentForLab);
    component = fixture.componentInstance;
    messageService = TestBed.inject(MessageService); 
    fixture.detectChanges();
  });

   
    it("expect component template to be empty", () => {
        //Note: there is @if"messageService.messages.length" in line 1 in template
       expect(fixture.nativeElement.querySelector('#container')).toBeNull();

    })
    it("then expect div.msg to have the messages after setting it", () => {
        messageService.messages = [{ id: 1, message: 'aaaaaa' }, { id: 2, message: 'bbbbbbbb' }];

        fixture.detectChanges();
    

        const messageElements = fixture.nativeElement.querySelectorAll('.msg');
        expect(messageElements.length).toBe(2); 
        expect(messageElements[0].textContent).toContain('aaaaaa'); 
        expect(messageElements[1].textContent).toContain('bbbbbbbb'); 
      });
    
})