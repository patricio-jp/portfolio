import { AfterViewInit, ChangeDetectionStrategy, Component, CUSTOM_ELEMENTS_SCHEMA, ElementRef, viewChild } from '@angular/core';
import { SwiperContainer } from 'swiper/element';

@Component({
    selector: 'app-skills',
    imports: [],
    templateUrl: './skills.component.html',
    styles: ``,
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkillsComponent implements AfterViewInit {
  private readonly swiperElement = viewChild<ElementRef<SwiperContainer>>('skillsSwiper');

  ngAfterViewInit() {
    const swiper = this.swiperElement()?.nativeElement;
    if (!swiper) return;

    Object.assign(swiper, {
      slidesPerView: 3,
      spaceBetween: 20,
      loop: true,
      autoplay: {
        delay: 2500,
      },
      breakpoints: {
        768: {
          slidesPerView: 4,
          spaceBetween: 30,
        },
        1024: {
          slidesPerView: 5,
          spaceBetween: 30,
        },
      },
    });
    swiper.initialize();
  }
}
