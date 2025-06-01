# Adding Features to the Figma Widget

This guide explains how to add new features to the REST Endpoints Figma Widget following the established patterns and architecture.

## 🏗️ Feature Architecture Overview

Each feature in the widget follows a consistent pattern with three main components:

```
widget-src/
├── {feature-name}/
│   ├── hooks/
│   │   ├── use{FeatureName}State.tsx    # State management
│   │   └── use{FeatureName}Feature.tsx  # Menu integration
│   └── components/                      # Optional UI components
│       └── {ComponentName}.tsx
```

## 📋 Step-by-Step Guide

### Step 1: Create the Feature Directory Structure

```bash
mkdir -p widget-src/{feature-name}/hooks
mkdir -p widget-src/{feature-name}/components  # Optional
```

### Step 2: Create the State Hook

Create `widget-src/{feature-name}/hooks/use{FeatureName}State.tsx`:

```tsx
const { widget } = figma;
const { useSyncedState } = widget;

// Import utility hooks if needed
import { useToggleableFeature } from "../../hooks/useToggleableFeature";

// Define your feature's data types
export type {FeatureName}Type = "Option1" | "Option2" | "Option3";

// State keys for synced storage
const {FEATURE_NAME}_STATE_KEYS = {
  FEATURE_PROPERTY: "featureProperty",
  IS_{FEATURE_NAME}_ENABLED: "is{FeatureName}Enabled", // For toggleable features
} as const;

// Default values
const {FEATURE_NAME}_DEFAULT_VALUES = {
  FEATURE_PROPERTY: "defaultValue",
  IS_{FEATURE_NAME}_ENABLED: false,
} as const;

// State interface
export type {FeatureName}State = {
  featureProperty: {FeatureName}Type;
  setFeatureProperty: (value: {FeatureName}Type) => void;
  is{FeatureName}Enabled?: boolean;           // For toggleable features
  setIs{FeatureName}Enabled?: (enabled: boolean) => void;
  enable{FeatureName}?: () => void;     // For toggleable features
  disable{FeatureName}?: () => void;    // For toggleable features
};

export function use{FeatureName}State(): {FeatureName}State {
  const [featureProperty, setFeatureProperty] = useSyncedState<{FeatureName}Type>(
    {FEATURE_NAME}_STATE_KEYS.FEATURE_PROPERTY,
    {FEATURE_NAME}_DEFAULT_VALUES.FEATURE_PROPERTY
  );

  // For toggleable features, add this:
  const feature = useToggleableFeature(
    {FEATURE_NAME}_STATE_KEYS.IS_{FEATURE_NAME}_ENABLED,
    {FEATURE_NAME}_DEFAULT_VALUES.IS_{FEATURE_NAME}_ENABLED
  );

  return {
    featureProperty,
    setFeatureProperty,
    // For toggleable features:
    is{FeatureName}Enabled: feature.enabled,
    setIs{FeatureName}Enabled: feature.setEnabled,
    enable{FeatureName}: feature.enable,
    disable{FeatureName}: feature.disable,
  };
}
```

### Step 3: Create the Feature Hook

Create `widget-src/{feature-name}/hooks/use{FeatureName}Feature.tsx`:

```tsx
import { use{FeatureName}State, type {FeatureName}State } from "./use{FeatureName}State";
import type { Feature } from "../../types";

export type {FeatureName}Feature = Feature<{FeatureName}State>;

export function use{FeatureName}Feature(): {FeatureName}Feature {
  const state = use{FeatureName}State();

  return {
    state,
    menuOptions: [
      // Choose the appropriate menu item type:

      // For dropdowns:
      {
        itemType: "dropdown",
        propertyName: "featureProperty",
        tooltip: "Feature Name",
        selectedOption: state.featureProperty,
        options: OPTIONS_ARRAY.map((option) => ({
          option: option,
          label: option,
        })),
        handler: (propertyValue) => {
          if (propertyValue && isValidType(propertyValue)) {
            state.setFeatureProperty(propertyValue);
          }
        },
      },

      // For toggles:
      {
        itemType: "toggle",
        propertyName: "toggle{FeatureName}",
        tooltip: "Feature Name",
        isToggled: state.is{FeatureName}Enabled,
        handler: () => {
          state.is{FeatureName}Enabled
            ? state.disabl{FeatureName}()
            : state.enable{FeatureName}();
        },
      },

      // For color selectors:
      {
        itemType: "color-selector",
        propertyName: "featureColor",
        tooltip: "Feature Color",
        selectedOption: state.featureColor,
        options: COLOR_OPTIONS,
        handler: (propertyValue) => {
          if (propertyValue && typeof propertyValue === "string") {
            state.setFeatureColor(propertyValue);
          }
        },
      },

      // For action buttons:
      {
        itemType: "action",
        propertyName: "featureAction",
        tooltip: "Do Action",
        handler: () => {
          // Perform action
        },
      },
    ],
  };
}
```

### Step 4: Create UI Components (Optional)

If your feature needs UI components, create them in `widget-src/{feature-name}/components/`:

```tsx
const { widget } = figma;
const { AutoLayout, Text, Input } = widget;

import type { {FeatureName}Feature } from "../hooks/use{FeatureName}Feature";

type {ComponentName}Props = {
  {featureName}: {FeatureName}Feature;
  // Additional props as needed
};

export function {ComponentName}({ {featureName} }: {ComponentName}Props) {
  // Early return if feature is disabled (for toggleable features)
  if (!{featureName}.state.is{FeatureName}Enabled) return null;

  return (
    <AutoLayout direction="vertical" spacing={8} width="fill-parent">
      {/* Your component JSX */}
    </AutoLayout>
  );
}
```

### Step 5: Integrate with Main Widget

Update `widget-src/code.tsx`:

```tsx
// Add imports
import { use{FeatureName}Feature } from "./{feature-name}/hooks/use{FeatureName}Feature";
import { {ComponentName} } from "./{feature-name}/components/{ComponentName}"; // If needed

function Widget() {
  try {
    // Add feature hook
    const {featureName} = use{FeatureName}Feature();

    // Add to menu (order matters for UI)
    useWidgetMenu([
      color,
      layout,
      endpoint,
      request,
      response,
      description,
      {featureName}, // Add your feature
    ]);

    return (
      <DefaultLayout
        endpoint={endpoint}
        request={request}
        response={response}
        color={color}
        description={description}
        {featureName}={{featureName}} // Pass to layout if needed
      />
    );
  } catch (error) {
    // Error handling...
  }
}
```

### Step 6: Update Layout Components

If your feature needs UI, update the layout components:

**Update `widget-src/layout/components/DefaultLayout.tsx`:**

```tsx
// Add import
import type { {FeatureName}Feature } from "../../{feature-name}/hooks/use{FeatureName}Feature";
import { {ComponentName} } from "../../{feature-name}/components/{ComponentName}";

type DefaultLayoutProps = {
  // Existing props...
  {featureName}: {FeatureName}Feature;
};

export function DefaultLayout({
  // Existing props...
  {featureName},
}: DefaultLayoutProps) {
  return (
    <AutoLayout direction="vertical" spacing={16} padding={0}>
      <AutoLayout>
        {/* Existing components... */}

        {/* Add your component where appropriate */}
        <{ComponentName} {featureName}={{featureName}} />
      </AutoLayout>
    </AutoLayout>
  );
}
```

## 🎯 Menu Item Types Reference

### Dropdown

Best for: Selecting from predefined options

```tsx
{
  itemType: "dropdown",
  propertyName: "property",
  tooltip: "Property Label",
  selectedOption: state.currentValue,
  options: [
    { option: "value1", label: "Display Label 1" },
    { option: "value2", label: "Display Label 2" },
  ],
  handler: (propertyValue) => {
    if (propertyValue && isValid(propertyValue)) {
      state.setValue(propertyValue);
    }
  },
}
```

### Toggle

Best for: Enable/disable functionality

```tsx
{
  itemType: "toggle",
  propertyName: "toggleProperty",
  tooltip: "Toggle Label",
  isToggled: state.isPropertyEnabled,
  handler: () => {
    if (state.isPropertyEnabled) {
      state.disableProperty();
    } else {
      state.enableProperty();
    }
  },
}
```

### Color Selector

Best for: Color choices

```tsx
{
  itemType: "color-selector",
  propertyName: "colorProperty",
  tooltip: "Color Label",
  selectedOption: state.currentColor,
  options: [
    { option: "#FF0000", tooltip: "Red" },
    { option: "#00FF00", tooltip: "Green" },
  ],
  handler: (propertyValue) => {
    if (propertyValue && typeof propertyValue === "string") {
      state.setColor(propertyValue);
    }
  },
}
```

### Action

Best for: Triggering functions

```tsx
{
  itemType: "action",
  propertyName: "actionProperty",
  tooltip: "Action Label",
  handler: () => {
    // Perform action
  },
}
```

## 🔧 Utility Hooks Available

- `useToggleableFeature(key, defaultValue)` - For enable/disable functionality
- `usePanelState(key, defaultValue)` - For panel state management
- `useEditableContent(key, defaultValue)` - For editable text content

## 📋 Naming Conventions

### Toggle Features

For features that can be enabled/disabled, use this naming pattern:

- **State Key**: `"is{FeatureName}Enabled"` (e.g., `"isRequestEnabled"`, `"isDescriptionEnabled"`)
- **State Property**: `is{FeatureName}Enabled: boolean`
- **Setter**: `setIs{FeatureName}Enabled: (enabled: boolean) => void`
- **Enable Function**: `enable{FeatureName}: () => void`
- **Disable Function**: `disable{FeatureName}: () => void`

**Examples from existing features:**

- Description: `isDescriptionEnabled`, `enableDescription()`, `disableDescription()`
- Request: `isRequestEnabled`, `enableRequest()`, `disableRequest()`
- Response: `isResponseEnabled`, `enableResponse()`, `disableResponse()`

## 🧪 Testing Your Feature

1. **Build the project**: `npm run build`
2. **Check TypeScript**: `npm run tsc`
3. **Run linting**: `npm run lint`
4. **Test in Figma**: Load the widget and verify:
   - Menu item appears correctly
   - State persists across sessions
   - UI components render properly
   - Feature integrates well with others

## 📝 Best Practices

1. **Naming Convention**: Use PascalCase for types, camelCase for properties
2. **State Keys**: Use UPPER_SNAKE_CASE for state key constants
3. **Default Values**: Always provide sensible defaults
4. **Type Safety**: Add validation functions for complex types
5. **Conditional Rendering**: Use early returns for better performance
6. **Error Handling**: Wrap state changes in try-catch if needed
7. **Documentation**: Add JSDoc comments for complex functions
8. **Toggle Naming**: Use `is{FeatureName}Enabled` pattern for toggle features

## 📂 Example: Complete Feature Implementation

See existing features for reference:

- **Simple Toggle**: `description/` - Basic toggle with text input
- **Dropdown**: `layout/` or `endpoint/` - Selection from options
- **Color Selector**: `color/` - Color palette selection
- **Complex State**: `request/` or `response/` - Multiple state properties

## 🚀 Advanced Patterns

### Multiple Menu Items per Feature

```tsx
menuOptions: [
  {
    itemType: "toggle",
    propertyName: "enableFeature",
    tooltip: "Enable Feature",
    isToggled: state.isFeatureEnabled,
    handler: () => {
      if (state.isFeatureEnabled) {
        state.disableFeature();
      } else {
        state.enableFeature();
      }
    },
  },
  {
    itemType: "dropdown",
    propertyName: "featureMode",
    tooltip: "Feature Mode",
    selectedOption: state.mode,
    options: MODE_OPTIONS,
    handler: state.setMode,
  },
],
```

### Conditional Menu Items

```tsx
menuOptions: state.isAdvancedMode ? [
  // Advanced options
] : [
  // Basic options
],
```

By following this guide, you can add new features that integrate seamlessly with the existing widget architecture! 🎉
