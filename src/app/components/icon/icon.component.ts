import { HttpClient } from '@angular/common/http'
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core'
import { DomSanitizer, SafeHtml } from '@angular/platform-browser'

@Component({
    selector: 'app-icon',
    templateUrl: './icon.component.html',
    styleUrls: ['./icon.component.scss'],
    standalone: true,
})
export class IconComponent implements OnInit {
    @Input() name: string = ''
    @Input() size: string = '25px'
    @Input() color: string = ''
    @Output() iconClick = new EventEmitter<void>()
    iconPath: string = '/assets/svg/'
    svgContent: SafeHtml = ''

    constructor(
        private http: HttpClient,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit(): void {
        this.iconPath = this.iconPath + this.name
        this.loadSvgContent()
    }

    // Método loadSvgContent modificado para incluir color y tamaño
    private loadSvgContent(): void {
        this.http.get(this.iconPath, { responseType: 'text' }).subscribe({
            next: (data) => {
                const parser = new DOMParser()
                const doc = parser.parseFromString(data, 'image/svg+xml')
                const svgElement = doc.querySelector('svg')
                if (svgElement) {
                    svgElement.setAttribute('height', this.size)
                    svgElement.setAttribute('width', this.size)
                    svgElement.setAttribute('fill', this.color)
                }
                const serializer = new XMLSerializer()
                this.svgContent = this.sanitizer.bypassSecurityTrustHtml(serializer.serializeToString(doc))
            },
            error: (error) => console.error('Error loading SVG:', error),
        })
    }

    onIconClick = (): void => {
        this.iconClick.emit()
    }
}
