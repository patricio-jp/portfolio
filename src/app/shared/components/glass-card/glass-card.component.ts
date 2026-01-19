import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import type { ClassValue } from 'clsx';

import { mergeClasses } from '@/shared/utils/merge-classes';

@Component({
  selector: 'z-glass-card',
  imports: [],
  template: `<ng-content />`,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[class]': 'classes()'
  }
})
export class GlassCardComponent {
  readonly class = input<ClassValue>('');
  readonly blur = input<'sm' | 'md' | 'lg' | 'xl'>('md');

  protected readonly classes = computed(() => {
    const blurClasses = {
      sm: 'backdrop-blur-sm',
      md: 'backdrop-blur-md',
      lg: 'backdrop-blur-lg',
      xl: 'backdrop-blur-xl'
    };

    const inputClass = this.class();
    const hasRoundedNone = typeof inputClass === 'string' && inputClass.includes('rounded-none');
    const hasBorderNone = typeof inputClass === 'string' && inputClass.includes('border-none');

    return mergeClasses(
      'bg-white/10',
      !hasBorderNone && 'border border-white/30',
      !hasRoundedNone && 'rounded-xl',
      'shadow-2xl shadow-black/20',
      blurClasses[this.blur()],
      'transition-all duration-300',
      this.class()
    );
  });
}
