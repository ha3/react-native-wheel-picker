package com.wheelpicker;

import com.facebook.react.bridge.ReadableMap;

public interface LoopListener {
    void onItemSelect(LoopView view, ReadableMap item, int position);
}

