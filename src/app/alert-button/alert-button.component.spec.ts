import { async, ComponentFixture, TestBed, inject, tick, fakeAsync } from '@angular/core/testing';

import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

import { AlertButtonComponent } from './alert-button.component';

import { MessageService } from '../message.service';
import { of } from 'rxjs/observable/of';

describe('AlertButtonComponent', () => {
  let component: AlertButtonComponent;
  // the test environment for the component
  let fixture: ComponentFixture<AlertButtonComponent>;
  let de: DebugElement;

  let serviceStub: any;

  beforeEach(async(() => {

    serviceStub = {
      getContent: () => of('You have been warned')
    };

    TestBed.configureTestingModule({
      declarations: [ AlertButtonComponent ],
      providers: [ { provide: MessageService, useValue: serviceStub } ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertButtonComponent);
    component = fixture.componentInstance;
    de = fixture.debugElement;
    fixture.detectChanges();
  });

  // Test to make sure the element was created.
  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have a severity greater than 2', () => {
    expect(component.severity).toBeGreaterThan(2);
  });

  it('should have a h1 tag of `Alert Button', () => {
    expect( de.query( By.css('h1') ).nativeElement.innerText ).toBe('Alert Button');
  });

  it('should toggle the message boolean', () => {
    expect(component.hideContent).toBeTruthy();
    component.toggle();
    expect(component.hideContent).toBeFalsy();
  });

  it('should toggle the message boolean asynchronously', fakeAsync(() => {
    expect(component.hideContent).toBeTruthy();
    component.toggleAsync();
    // Simulates the delay of 500ms
    tick(500);
    expect(component.hideContent).toBeFalsy();
  }));

  it('should have message content defined from an observable', () => {
    component.content.subscribe(content => {
      expect(content).toBeDefined();
      expect(content).toBe('You have been warned');
    });
  });
});

// ng test -sm=false    run to get rid of the "Angular tests failing with Failed to execute 'send' on 'XMLHttpRequest'" message
