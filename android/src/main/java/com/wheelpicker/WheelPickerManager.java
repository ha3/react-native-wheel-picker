package com.wheelpicker;

/**
 * Created by Eleken. on 13.12.16.
 */
import android.graphics.Color;
import android.graphics.Typeface;
import android.util.Log;

import com.facebook.react.bridge.Arguments;
import com.facebook.react.bridge.ReactContext;
import com.facebook.react.bridge.ReadableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.uimanager.annotations.ReactProp;
import com.facebook.react.uimanager.SimpleViewManager;
import com.facebook.react.uimanager.ThemedReactContext;
import com.facebook.react.uimanager.events.RCTEventEmitter;
import com.facebook.react.views.text.ReactFontManager;

import java.util.ArrayList;
import java.util.List;

public class WheelPickerManager extends SimpleViewManager<LoopView> implements LoopListener{
    LoopView wheelPicker;
    public static final String REACT_CLASS = "WheelPicker";

    @Override
    public String getName() {
        return REACT_CLASS;
    }

    @Override
    protected LoopView createViewInstance(ThemedReactContext context) {
        wheelPicker = new LoopView(context);
        wheelPicker.setListener(this);
        return wheelPicker;
    }

    @ReactProp(name = "data")
    public void setData(LoopView wheelPicker, ReadableArray data) {
        if (wheelPicker!=null){
            List<String> emptyList = new ArrayList<>();
            try {
                List<Integer> dataInt = new ArrayList<>();
                for (int i = 0; i <data.size() ; i++) {
                    dataInt.add(data.getInt(i));
                }
                wheelPicker.setArrayList((ArrayList) dataInt);
            } catch (Exception e){
                try {
                    List<String> dataString = new ArrayList<>();
                    for (int i = 0; i <data.size() ; i++) {
                        dataString.add(data.getString(i));
                    }
                    wheelPicker.setArrayList((ArrayList) dataString);
                } catch (Exception ex){
                    ex.printStackTrace();
                    wheelPicker.setArrayList((ArrayList) emptyList);
                }
            }
        }
    }

    @ReactProp(name = "isCyclic")
    public void setCyclic(LoopView wheelPicker, Boolean isCyclic) {
        if (wheelPicker!=null){
            wheelPicker.setLoop(isCyclic);
        }
    }

    @ReactProp(name = "selectedItemTextColor")
    public void setSelectedItemTextColor(LoopView wheelPicker, int selectedItemTextColor) {
        if (wheelPicker!=null){
            wheelPicker.setSelectedItemTextColor(selectedItemTextColor);
        }
    }


    @ReactProp(name = "selectedItemTextSize")
    public void setSelectedItemTextSize(LoopView wheelPicker, int itemTextSize) {
        if (wheelPicker!=null){
            wheelPicker.setSelectedItemTextSize(itemTextSize);
        }
    }

    @ReactProp(name = "selectedItemTextFontFamily")
    public void setSelectedItemFont(LoopView wheelPicker, String itemTextFontFamily) {
        if (wheelPicker!=null){
            Typeface typeface = ReactFontManager.getInstance().getTypeface(itemTextFontFamily, Typeface.NORMAL, wheelPicker.getContext().getAssets());
            wheelPicker.setSelectedItemFont(typeface);
        }
    }

    @ReactProp(name = "indicatorWidth")
    public void setIndicatorWidth(LoopView wheelPicker, int indicatorSize) {
        if (wheelPicker!=null){
            wheelPicker.setIndicatorWidth(indicatorSize);
        }
    }

    @ReactProp(name = "hideIndicator")
    public void setIndicator(LoopView wheelPicker, Boolean renderIndicator) {
        if (wheelPicker!=null){
            wheelPicker.hideIndicator();
        }
    }

    @ReactProp(name = "indicatorColor")
    public void setIndicatorColor(LoopView wheelPicker, int indicatorColor) {
        if (wheelPicker!=null){
            wheelPicker.setIndicatorColor(indicatorColor);
        }
    }

    @ReactProp(name = "itemTextColor")
    public void setItemTextColor(LoopView wheelPicker, int itemTextColor) {
        if (wheelPicker!=null){
            wheelPicker.setItemTextColor(itemTextColor);
        }
    }

    @ReactProp(name = "itemTextSize")
    public void setItemTextSize(LoopView wheelPicker, int itemTextSize) {
        if (wheelPicker!=null){
            wheelPicker.setItemTextSize(itemTextSize);
        }
    }

    @ReactProp(name = "itemTextFontFamily")
    public void setItemFont(LoopView wheelPicker, String itemTextFontFamily) {
      if (wheelPicker!=null){
        Typeface typeface = ReactFontManager.getInstance().getTypeface(itemTextFontFamily, Typeface.NORMAL, wheelPicker.getContext().getAssets());
        wheelPicker.setItemFont(typeface);
      }
    }

    @ReactProp(name = "initPosition")
    public void setInitialPosition(LoopView wheelPicker, int selectedItemPosition) {
        if (wheelPicker!=null){
            wheelPicker.setInitPosition(selectedItemPosition);
        }
    }

    @ReactProp(name = "backgroundColor")
    public void setBackgroundColor(LoopView wheelPicker, int backgroundColor) {
        if (wheelPicker != null){
            wheelPicker.setBackgroundColor(backgroundColor);
        }
    }


    @ReactProp(name = "selectedItem")
    public void setSelectedItem(LoopView wheelPicker, int pos) {
        if (wheelPicker!=null){
            wheelPicker.setSelectedItem(pos);
        }
    }


    @Override
    public void onItemSelect(LoopView picker, int item) {
        if (wheelPicker != null){
            WritableMap event = Arguments.createMap();
            event.putInt("position", item);
            ((ReactContext) wheelPicker.getContext()).getJSModule(RCTEventEmitter.class).receiveEvent(
                    picker.getId(),
                    "topChange",
                    event);
        }
    }
}
