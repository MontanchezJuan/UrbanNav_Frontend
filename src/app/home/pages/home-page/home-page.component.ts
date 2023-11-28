import { Component, ElementRef, OnInit } from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'home-home-page',
  templateUrl: './home-page.component.html',
})
export class HomePageComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit(): void {
    this.animarTexto();
  }

  animarTexto() {
    if (!document.getElementById('title')) return;

    const textoElement = this.el.nativeElement.querySelector('#title');
    const texto = textoElement.textContent;
    const letras = texto.split('');

    textoElement.innerHTML = '';

    const tl = gsap.timeline();

    letras.forEach((letra: string, index: number) => {
      const span = document.createElement('span');
      span.textContent = letra === ' ' ? '\u00A0' : letra;
      span.style.display = 'inline-block';

      tl.from(
        span,
        { opacity: 0, duration: 0.5, ease: 'power2.inOut' },
        index * 0.1,
      );

      textoElement.appendChild(span);
    });
  }
}
