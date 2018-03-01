# Select

### MVP

* Placeholder
* States - hover, focus, etc
* Controlled/uncontrolled
* Uses Dropdown/Popover/Menu components
* Keyboard nav
  * open/close and navigate menu
  * Simplified typeahead
* Works in FormField
* Variants
* Disabled
* ReadOnly
* Sizes


### Not MVP

* Multiple item selection
* Tagging
* Input typeahead filtering
* Native select
* Avatars
* Store items in instance variable [perf]
* Render props
* Custom item renderer for root item


### Design Questions

* Component width
  * Question for all of our form elements
* Clearable
* Select specs show MenuItem secondary text on a new line


### Todos los TODOs

* Improve prop documentation
* Examples
  * Control props issue with selectedItem and highlightedIndex
  * States
    * Fix issue with simulated states - (Kyle) I don't think this is reasonable until render props
  * More...
    * Async data loading?
    * Extract useful examples from kitchen sink and get rid of others.
* Best practices
* Test coverage
  * Unit tests
  * Snapshots
* Cross browser testing
* A11y testing
* Test in CRA


### Intentional Changes

* Close Select, Dropdown, Popover on blur outside component
* Added typeahead to Dropdown
* Added highlightedIndex control prop to dropdown
* Menu and Dropdown now support both flat and hierarchical data prop

### Followup

* Publish mineral-ui-icons package
* Implement render props across Popover components
* Avatar component should extract 2 letters
* Avatar renders icon prop as <span icon="[object Object]" in basic usage example
* Add "built-in" avatar support to MenuItem, similar to icons
* CustomRender examples updated to render something simple besides an Avatar
* Add RTL Dropdown example and adjust content placement based on RTL
