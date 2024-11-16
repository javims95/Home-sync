import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IconSelectorPage } from './icon-selector.page';

describe('IconSelectorPage', () => {
  let component: IconSelectorPage;
  let fixture: ComponentFixture<IconSelectorPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(IconSelectorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
