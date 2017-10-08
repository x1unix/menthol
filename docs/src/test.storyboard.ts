import {Storyboard} from '../../src/view/Storyboard';
import {Label} from '../../src/components/Label';
import {Rectangle} from '../../src/components/Rectangle';
import {Button} from '../../src/components/Button';
import {LinearLayout} from '../../src/view/layouts/LinearLayout';
import {TextView} from '../../src/widgets/TextView';
import {MTColor} from '../../src/foundation/MTColor';
import {LayoutParams} from '../../src/view/LayoutParams';
import {Typeface} from '../../src/graphics/Typeface';

/**
 * Application storyboard class
 */
export class TestStoryboard extends Storyboard {

  public onCreate() {
    super.onCreate();

    const linearLayout = new LinearLayout(this);
    linearLayout.setOrientation(LinearLayout.VERTICAL);
    linearLayout.setBackgroundColor(MTColor.fromHex('#0094FF'));

    const layoutParams = new LayoutParams();
    layoutParams.width = LayoutParams.FILL_PARENT;
    layoutParams.height = LayoutParams.FILL_PARENT;

    linearLayout.setLayoutParams(layoutParams);


    const text = new TextView(this);
    text.setParentGroup(linearLayout);
    text.setTypeface(Typeface.SANS_SERIF);
    text.setTextColor(MTColor.fromHex('#ffffff'));
    text.setTextSize(32);

    linearLayout.addView(text);
    this.setContentView(linearLayout);
  }

  /**
   * On Storyboard destroy hook
   */
  onDestroy() {
    super.onDestroy();
  }
}
