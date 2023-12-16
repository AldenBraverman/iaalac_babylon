import * as BABYLON from 'babylonjs'
export class AppOne {
    engine: BABYLON.Engine;
    scene: BABYLON.Scene;

    constructor(readonly canvas: HTMLCanvasElement) {
        this.engine = new BABYLON.Engine(canvas)
        window.addEventListener('resize', () => {
            this.engine.resize();
        });
        this.scene = createScene(this.engine, this.canvas)

    }

    debug(debugOn: boolean = true) {
        if (debugOn) {
            // this.scene.debugLayer.show({ overlay: true });
        } else {
            // this.scene.debugLayer.hide();
        }
    }

    run() {
        this.debug(true);
        this.engine.runRenderLoop(() => {
            this.scene.render();
        });
    }

}


var createScene = function (engine: BABYLON.Engine, canvas: HTMLCanvasElement) {
    // This creates a basic Babylon Scene object (non-mesh)
    var scene = new BABYLON.Scene(engine);

    // This creates and positions a free camera (non-mesh)
    var camera = new BABYLON.FreeCamera("camera1", new BABYLON.Vector3(0, 0, -3), scene);
    // camera.fov = 269.7;
    // const camera = new BABYLON.UniversalCamera("UniversalCamera", new BABYLON.Vector3(0, 0, -10), scene);

    // This targets the camera to scene origin
    camera.setTarget(BABYLON.Vector3.Zero());

    // This attaches the camera to the canvas
    // camera.attachControl(canvas, true);

    // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
    var light = new BABYLON.HemisphericLight("light", new BABYLON.Vector3(0, 1, 0), scene);

    // Default intensity is 1. Let's dim the light a small amount
    light.intensity = 1.5;

    // Our built-in 'sphere' shape.
    // var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", {diameter: 2, segments: 32}, scene);

    // Move the sphere upward 1/2 its height
    // sphere.position.y = 1;

    // Our built-in 'ground' shape.
    // var ground = BABYLON.MeshBuilder.CreateGround("ground", {width: 6, height: 6}, scene);
    var plane = BABYLON.MeshBuilder.CreatePlane("plane", {width: 6, height: 6}, scene);

    var nodeMaterial = new BABYLON.NodeMaterial("node");
    nodeMaterial.mode = BABYLON.NodeMaterialModes.Material;

    // InputBlock
    var position = new BABYLON.InputBlock("position");
    position.visibleInInspector = false;
    position.visibleOnFrame = false;
    position.target = 1;
    position.setAsAttribute("position");

    // TransformBlock
    var WorldPos = new BABYLON.TransformBlock("WorldPos");
    WorldPos.visibleInInspector = false;
    WorldPos.visibleOnFrame = false;
    WorldPos.target = 1;
    WorldPos.complementZ = 0;
    WorldPos.complementW = 1;

    // InputBlock
    var World = new BABYLON.InputBlock("World");
    World.visibleInInspector = false;
    World.visibleOnFrame = false;
    World.target = 1;
    World.setAsSystemValue(BABYLON.NodeMaterialSystemValues.World);

    // TransformBlock
    var Worldnormal = new BABYLON.TransformBlock("World normal");
    Worldnormal.visibleInInspector = false;
    Worldnormal.visibleOnFrame = false;
    Worldnormal.target = 1;
    Worldnormal.complementZ = 0;
    Worldnormal.complementW = 0;

    // InputBlock
    var normal = new BABYLON.InputBlock("normal");
    normal.visibleInInspector = false;
    normal.visibleOnFrame = false;
    normal.target = 1;
    normal.setAsAttribute("normal");

    // PBRMetallicRoughnessBlock
    var PBRMetallicRoughness = new BABYLON.PBRMetallicRoughnessBlock("PBRMetallicRoughness");
    PBRMetallicRoughness.visibleInInspector = false;
    PBRMetallicRoughness.visibleOnFrame = false;
    PBRMetallicRoughness.target = 3;
    PBRMetallicRoughness.lightFalloff = 0;
    PBRMetallicRoughness.useAlphaTest = false;
    PBRMetallicRoughness.alphaTestCutoff = 0.5;
    PBRMetallicRoughness.useAlphaBlending = false;
    PBRMetallicRoughness.useRadianceOverAlpha = true;
    PBRMetallicRoughness.useSpecularOverAlpha = true;
    PBRMetallicRoughness.enableSpecularAntiAliasing = false;
    PBRMetallicRoughness.realTimeFiltering = false;
    PBRMetallicRoughness.realTimeFilteringQuality = 8;
    PBRMetallicRoughness.useEnergyConservation = true;
    PBRMetallicRoughness.useRadianceOcclusion = true;
    PBRMetallicRoughness.useHorizonOcclusion = true;
    PBRMetallicRoughness.unlit = false;
    PBRMetallicRoughness.forceNormalForward = false;
    PBRMetallicRoughness.debugMode = 0;
    PBRMetallicRoughness.debugLimit = 0;
    PBRMetallicRoughness.debugFactor = 1;

    // InputBlock
    var view = new BABYLON.InputBlock("view");
    view.visibleInInspector = false;
    view.visibleOnFrame = false;
    view.target = 1;
    view.setAsSystemValue(BABYLON.NodeMaterialSystemValues.View);

    // InputBlock
    var cameraPosition = new BABYLON.InputBlock("cameraPosition");
    cameraPosition.visibleInInspector = false;
    cameraPosition.visibleOnFrame = false;
    cameraPosition.target = 1;
    cameraPosition.setAsSystemValue(BABYLON.NodeMaterialSystemValues.CameraPosition);

    // MultiplyBlock
    var Multiply = new BABYLON.MultiplyBlock("Multiply");
    Multiply.visibleInInspector = false;
    Multiply.visibleOnFrame = false;
    Multiply.target = 4;

    // MultiplyBlock
    var Multiply1 = new BABYLON.MultiplyBlock("Multiply");
    Multiply1.visibleInInspector = false;
    Multiply1.visibleOnFrame = false;
    Multiply1.target = 4;

    // ClampBlock
    var Clamp = new BABYLON.ClampBlock("Clamp");
    Clamp.visibleInInspector = false;
    Clamp.visibleOnFrame = false;
    Clamp.target = 4;
    Clamp.minimum = 0;
    Clamp.maximum = 1;

    // SubtractBlock
    var Subtract = new BABYLON.SubtractBlock("Subtract");
    Subtract.visibleInInspector = false;
    Subtract.visibleOnFrame = false;
    Subtract.target = 4;

    // TrigonometryBlock
    var Abs = new BABYLON.TrigonometryBlock("Abs");
    Abs.visibleInInspector = false;
    Abs.visibleOnFrame = false;
    Abs.target = 4;
    Abs.operation = BABYLON.TrigonometryBlockOperations.Abs;

    // SubtractBlock
    var Subtract1 = new BABYLON.SubtractBlock("Subtract");
    Subtract1.visibleInInspector = false;
    Subtract1.visibleOnFrame = false;
    Subtract1.target = 4;

    // MultiplyBlock
    var Multiply2 = new BABYLON.MultiplyBlock("Multiply");
    Multiply2.visibleInInspector = false;
    Multiply2.visibleOnFrame = false;
    Multiply2.target = 4;

    // TrigonometryBlock
    var Fract = new BABYLON.TrigonometryBlock("Fract");
    Fract.visibleInInspector = false;
    Fract.visibleOnFrame = false;
    Fract.target = 4;
    Fract.operation = BABYLON.TrigonometryBlockOperations.Fract;

    // AddBlock
    var Add = new BABYLON.AddBlock("Add");
    Add.visibleInInspector = false;
    Add.visibleOnFrame = false;
    Add.target = 4;

    // VectorMergerBlock
    var VectorMerger = new BABYLON.VectorMergerBlock("VectorMerger");
    VectorMerger.visibleInInspector = false;
    VectorMerger.visibleOnFrame = false;
    VectorMerger.target = 4;
    VectorMerger.xSwizzle = "x";
    VectorMerger.ySwizzle = "y";
    VectorMerger.zSwizzle = "z";
    VectorMerger.wSwizzle = "w";

    // DivideBlock
    var Divide = new BABYLON.DivideBlock("Divide");
    Divide.visibleInInspector = false;
    Divide.visibleOnFrame = false;
    Divide.target = 4;

    // AddBlock
    var Add1 = new BABYLON.AddBlock("Add");
    Add1.visibleInInspector = false;
    Add1.visibleOnFrame = false;
    Add1.target = 4;

    // SimplexPerlin3DBlock
    var SimplexPerlinD = new BABYLON.SimplexPerlin3DBlock("SimplexPerlin3D");
    SimplexPerlinD.visibleInInspector = false;
    SimplexPerlinD.visibleOnFrame = false;
    SimplexPerlinD.target = 2;

    // VectorMergerBlock
    var VectorMerger1 = new BABYLON.VectorMergerBlock("VectorMerger");
    VectorMerger1.visibleInInspector = false;
    VectorMerger1.visibleOnFrame = false;
    VectorMerger1.target = 4;
    VectorMerger1.xSwizzle = "x";
    VectorMerger1.ySwizzle = "y";
    VectorMerger1.zSwizzle = "z";
    VectorMerger1.wSwizzle = "w";

    // MultiplyBlock
    var Multiply3 = new BABYLON.MultiplyBlock("Multiply");
    Multiply3.visibleInInspector = false;
    Multiply3.visibleOnFrame = false;
    Multiply3.target = 4;

    // InputBlock
    var uv = new BABYLON.InputBlock("uv");
    uv.visibleInInspector = false;
    uv.visibleOnFrame = false;
    uv.target = 1;
    uv.setAsAttribute("uv");

    // InputBlock
    var uColorNoiseScale = new BABYLON.InputBlock("uColorNoiseScale");
    uColorNoiseScale.visibleInInspector = false;
    uColorNoiseScale.visibleOnFrame = false;
    uColorNoiseScale.target = 1;
    uColorNoiseScale.value = 6.025;
    uColorNoiseScale.min = 0;
    uColorNoiseScale.max = 0;
    uColorNoiseScale.isBoolean = false;
    uColorNoiseScale.matrixMode = 0;
    uColorNoiseScale.animationType = BABYLON.AnimatedInputBlockTypes.None;
    uColorNoiseScale.isConstant = false;

    // InputBlock
    var RealTime = new BABYLON.InputBlock("RealTime");
    RealTime.visibleInInspector = false;
    RealTime.visibleOnFrame = false;
    RealTime.target = 1;
    RealTime.value = 0;
    RealTime.min = 0;
    RealTime.max = 0;
    RealTime.isBoolean = false;
    RealTime.matrixMode = 0;
    RealTime.animationType = BABYLON.AnimatedInputBlockTypes.RealTime;
    RealTime.isConstant = false;

    // InputBlock
    var Float = new BABYLON.InputBlock("Float");
    Float.visibleInInspector = false;
    Float.visibleOnFrame = false;
    Float.target = 1;
    Float.value = 1;
    Float.min = 0;
    Float.max = 0;
    Float.isBoolean = false;
    Float.matrixMode = 0;
    Float.animationType = BABYLON.AnimatedInputBlockTypes.None;
    Float.isConstant = false;

    // InputBlock
    var hueScale_division = new BABYLON.InputBlock("hueScale_division");
    hueScale_division.visibleInInspector = false;
    hueScale_division.visibleOnFrame = false;
    hueScale_division.target = 1;
    hueScale_division.value = 2;
    hueScale_division.min = 0;
    hueScale_division.max = 0;
    hueScale_division.isBoolean = false;
    hueScale_division.matrixMode = 0;
    hueScale_division.animationType = BABYLON.AnimatedInputBlockTypes.None;
    hueScale_division.isConstant = false;

    // VectorMergerBlock
    var VectorMerger2 = new BABYLON.VectorMergerBlock("VectorMerger");
    VectorMerger2.visibleInInspector = false;
    VectorMerger2.visibleOnFrame = false;
    VectorMerger2.target = 4;
    VectorMerger2.xSwizzle = "x";
    VectorMerger2.ySwizzle = "y";
    VectorMerger2.zSwizzle = "z";
    VectorMerger2.wSwizzle = "w";

    // InputBlock
    var hsvrgb_x = new BABYLON.InputBlock("hsv2rgb_x");
    hsvrgb_x.visibleInInspector = false;
    hsvrgb_x.visibleOnFrame = false;
    hsvrgb_x.target = 1;
    hsvrgb_x.value = 1;
    hsvrgb_x.min = 0;
    hsvrgb_x.max = 0;
    hsvrgb_x.isBoolean = false;
    hsvrgb_x.matrixMode = 0;
    hsvrgb_x.animationType = BABYLON.AnimatedInputBlockTypes.None;
    hsvrgb_x.isConstant = false;

    // DivideBlock
    var Divide1 = new BABYLON.DivideBlock("Divide");
    Divide1.visibleInInspector = false;
    Divide1.visibleOnFrame = false;
    Divide1.target = 4;

    // InputBlock
    var hsvrgb_y = new BABYLON.InputBlock("hsv2rgb_y1");
    hsvrgb_y.visibleInInspector = false;
    hsvrgb_y.visibleOnFrame = false;
    hsvrgb_y.target = 1;
    hsvrgb_y.value = 2;
    hsvrgb_y.min = 0;
    hsvrgb_y.max = 0;
    hsvrgb_y.isBoolean = false;
    hsvrgb_y.matrixMode = 0;
    hsvrgb_y.animationType = BABYLON.AnimatedInputBlockTypes.None;
    hsvrgb_y.isConstant = false;

    // InputBlock
    var hsvrgb_y1 = new BABYLON.InputBlock("hsv2rgb_y2");
    hsvrgb_y1.visibleInInspector = false;
    hsvrgb_y1.visibleOnFrame = false;
    hsvrgb_y1.target = 1;
    hsvrgb_y1.value = 3;
    hsvrgb_y1.min = 0;
    hsvrgb_y1.max = 0;
    hsvrgb_y1.isBoolean = false;
    hsvrgb_y1.matrixMode = 0;
    hsvrgb_y1.animationType = BABYLON.AnimatedInputBlockTypes.None;
    hsvrgb_y1.isConstant = false;

    // DivideBlock
    var Divide2 = new BABYLON.DivideBlock("Divide");
    Divide2.visibleInInspector = false;
    Divide2.visibleOnFrame = false;
    Divide2.target = 4;

    // InputBlock
    var hsvrgb_z = new BABYLON.InputBlock("hsv2rgb_z1");
    hsvrgb_z.visibleInInspector = false;
    hsvrgb_z.visibleOnFrame = false;
    hsvrgb_z.target = 1;
    hsvrgb_z.value = 1;
    hsvrgb_z.min = 0;
    hsvrgb_z.max = 0;
    hsvrgb_z.isBoolean = false;
    hsvrgb_z.matrixMode = 0;
    hsvrgb_z.animationType = BABYLON.AnimatedInputBlockTypes.None;
    hsvrgb_z.isConstant = false;

    // InputBlock
    var hsvrgb_z1 = new BABYLON.InputBlock("hsv2rgb_z2");
    hsvrgb_z1.visibleInInspector = false;
    hsvrgb_z1.visibleOnFrame = false;
    hsvrgb_z1.target = 1;
    hsvrgb_z1.value = 3;
    hsvrgb_z1.min = 0;
    hsvrgb_z1.max = 0;
    hsvrgb_z1.isBoolean = false;
    hsvrgb_z1.matrixMode = 0;
    hsvrgb_z1.animationType = BABYLON.AnimatedInputBlockTypes.None;
    hsvrgb_z1.isConstant = false;

    // InputBlock
    var hsvrgb_w = new BABYLON.InputBlock("hsv2rgb_w");
    hsvrgb_w.visibleInInspector = false;
    hsvrgb_w.visibleOnFrame = false;
    hsvrgb_w.target = 1;
    hsvrgb_w.value = 3;
    hsvrgb_w.min = 0;
    hsvrgb_w.max = 0;
    hsvrgb_w.isBoolean = false;
    hsvrgb_w.matrixMode = 0;
    hsvrgb_w.animationType = BABYLON.AnimatedInputBlockTypes.None;
    hsvrgb_w.isConstant = false;

    // VectorMergerBlock
    var VectorMerger3 = new BABYLON.VectorMergerBlock("VectorMerger");
    VectorMerger3.visibleInInspector = false;
    VectorMerger3.visibleOnFrame = false;
    VectorMerger3.target = 4;
    VectorMerger3.xSwizzle = "x";
    VectorMerger3.ySwizzle = "y";
    VectorMerger3.zSwizzle = "z";
    VectorMerger3.wSwizzle = "w";

    // InputBlock
    var hsvrgb_vec_scale = new BABYLON.InputBlock("hsv2rgb_vec_scale");
    hsvrgb_vec_scale.visibleInInspector = false;
    hsvrgb_vec_scale.visibleOnFrame = false;
    hsvrgb_vec_scale.target = 1;
    hsvrgb_vec_scale.value = new BABYLON.Vector3(6, 6, 6);
    hsvrgb_vec_scale.isConstant = false;

    // VectorMergerBlock
    var VectorMerger4 = new BABYLON.VectorMergerBlock("VectorMerger");
    VectorMerger4.visibleInInspector = false;
    VectorMerger4.visibleOnFrame = false;
    VectorMerger4.target = 4;
    VectorMerger4.xSwizzle = "x";
    VectorMerger4.ySwizzle = "y";
    VectorMerger4.zSwizzle = "z";
    VectorMerger4.wSwizzle = "w";

    // InputBlock
    var hsvrgb_xxx = new BABYLON.InputBlock("hsv2rgb_xxx");
    hsvrgb_xxx.visibleInInspector = false;
    hsvrgb_xxx.visibleOnFrame = false;
    hsvrgb_xxx.target = 1;
    hsvrgb_xxx.value = 1;
    hsvrgb_xxx.min = 0;
    hsvrgb_xxx.max = 0;
    hsvrgb_xxx.isBoolean = false;
    hsvrgb_xxx.matrixMode = 0;
    hsvrgb_xxx.animationType = BABYLON.AnimatedInputBlockTypes.None;
    hsvrgb_xxx.isConstant = false;

    // ClampBlock
    var Clamp1 = new BABYLON.ClampBlock("Clamp");
    Clamp1.visibleInInspector = false;
    Clamp1.visibleOnFrame = false;
    Clamp1.target = 4;
    Clamp1.minimum = 0;
    Clamp1.maximum = 1;

    // PowBlock
    var Pow = new BABYLON.PowBlock("Pow");
    Pow.visibleInInspector = false;
    Pow.visibleOnFrame = false;
    Pow.target = 4;

    // SimplexPerlin3DBlock
    var SimplexPerlinD1 = new BABYLON.SimplexPerlin3DBlock("SimplexPerlin3D");
    SimplexPerlinD1.visibleInInspector = false;
    SimplexPerlinD1.visibleOnFrame = false;
    SimplexPerlinD1.target = 2;

    // VectorMergerBlock
    var VectorMerger5 = new BABYLON.VectorMergerBlock("VectorMerger");
    VectorMerger5.visibleInInspector = false;
    VectorMerger5.visibleOnFrame = false;
    VectorMerger5.target = 4;
    VectorMerger5.xSwizzle = "x";
    VectorMerger5.ySwizzle = "y";
    VectorMerger5.zSwizzle = "z";
    VectorMerger5.wSwizzle = "w";

    // MultiplyBlock
    var Multiply4 = new BABYLON.MultiplyBlock("Multiply");
    Multiply4.visibleInInspector = false;
    Multiply4.visibleOnFrame = false;
    Multiply4.target = 4;

    // InputBlock
    var uv1 = new BABYLON.InputBlock("uv");
    uv1.visibleInInspector = false;
    uv1.visibleOnFrame = false;
    uv1.target = 1;
    uv1.setAsAttribute("uv");

    // InputBlock
    var uBlackNoiseScale = new BABYLON.InputBlock("uBlackNoiseScale");
    uBlackNoiseScale.visibleInInspector = false;
    uBlackNoiseScale.visibleOnFrame = false;
    uBlackNoiseScale.target = 1;
    uBlackNoiseScale.value = 11.688;
    uBlackNoiseScale.min = 0;
    uBlackNoiseScale.max = 0;
    uBlackNoiseScale.isBoolean = false;
    uBlackNoiseScale.matrixMode = 0;
    uBlackNoiseScale.animationType = BABYLON.AnimatedInputBlockTypes.None;
    uBlackNoiseScale.isConstant = false;

    // InputBlock
    var RealTime1 = new BABYLON.InputBlock("RealTime");
    RealTime1.visibleInInspector = false;
    RealTime1.visibleOnFrame = false;
    RealTime1.target = 1;
    RealTime1.value = 0;
    RealTime1.min = 0;
    RealTime1.max = 0;
    RealTime1.isBoolean = false;
    RealTime1.matrixMode = 0;
    RealTime1.animationType = BABYLON.AnimatedInputBlockTypes.RealTime;
    RealTime1.isConstant = false;

    // InputBlock
    var uBlackNoiseExpo = new BABYLON.InputBlock("uBlackNoiseExpo");
    uBlackNoiseExpo.visibleInInspector = false;
    uBlackNoiseExpo.visibleOnFrame = false;
    uBlackNoiseExpo.target = 1;
    uBlackNoiseExpo.value = 0.554;
    uBlackNoiseExpo.min = 0;
    uBlackNoiseExpo.max = 0;
    uBlackNoiseExpo.isBoolean = false;
    uBlackNoiseExpo.matrixMode = 0;
    uBlackNoiseExpo.animationType = BABYLON.AnimatedInputBlockTypes.None;
    uBlackNoiseExpo.isConstant = false;

    // VectorMergerBlock
    var VectorMerger6 = new BABYLON.VectorMergerBlock("VectorMerger");
    VectorMerger6.visibleInInspector = false;
    VectorMerger6.visibleOnFrame = false;
    VectorMerger6.target = 4;
    VectorMerger6.xSwizzle = "x";
    VectorMerger6.ySwizzle = "y";
    VectorMerger6.zSwizzle = "z";
    VectorMerger6.wSwizzle = "w";

    // SubtractBlock
    var Subtract2 = new BABYLON.SubtractBlock("Subtract");
    Subtract2.visibleInInspector = false;
    Subtract2.visibleOnFrame = false;
    Subtract2.target = 4;

    // InputBlock
    var Float1 = new BABYLON.InputBlock("Float");
    Float1.visibleInInspector = false;
    Float1.visibleOnFrame = false;
    Float1.target = 1;
    Float1.value = 1;
    Float1.min = 0;
    Float1.max = 0;
    Float1.isBoolean = false;
    Float1.matrixMode = 0;
    Float1.animationType = BABYLON.AnimatedInputBlockTypes.None;
    Float1.isConstant = false;

    // MultiplyBlock
    var Multiply5 = new BABYLON.MultiplyBlock("Multiply");
    Multiply5.visibleInInspector = false;
    Multiply5.visibleOnFrame = false;
    Multiply5.target = 4;

    // InputBlock
    var uRectangleMaskStrength = new BABYLON.InputBlock("uRectangleMaskStrength");
    uRectangleMaskStrength.visibleInInspector = false;
    uRectangleMaskStrength.visibleOnFrame = false;
    uRectangleMaskStrength.target = 1;
    uRectangleMaskStrength.value = 16.061;
    uRectangleMaskStrength.min = 0;
    uRectangleMaskStrength.max = 0;
    uRectangleMaskStrength.isBoolean = false;
    uRectangleMaskStrength.matrixMode = 0;
    uRectangleMaskStrength.animationType = BABYLON.AnimatedInputBlockTypes.None;
    uRectangleMaskStrength.isConstant = false;

    // TrigonometryBlock
    var Abs1 = new BABYLON.TrigonometryBlock("Abs");
    Abs1.visibleInInspector = false;
    Abs1.visibleOnFrame = false;
    Abs1.target = 4;
    Abs1.operation = BABYLON.TrigonometryBlockOperations.Abs;

    // SubtractBlock
    var Subtract3 = new BABYLON.SubtractBlock("Subtract");
    Subtract3.visibleInInspector = false;
    Subtract3.visibleOnFrame = false;
    Subtract3.target = 4;

    // VectorSplitterBlock
    var VectorSplitter = new BABYLON.VectorSplitterBlock("VectorSplitter");
    VectorSplitter.visibleInInspector = false;
    VectorSplitter.visibleOnFrame = false;
    VectorSplitter.target = 4;

    // InputBlock
    var uv2 = new BABYLON.InputBlock("uv");
    uv2.visibleInInspector = false;
    uv2.visibleOnFrame = false;
    uv2.target = 1;
    uv2.setAsAttribute("uv");

    // InputBlock
    var Float2 = new BABYLON.InputBlock("Float");
    Float2.visibleInInspector = false;
    Float2.visibleOnFrame = false;
    Float2.target = 1;
    Float2.value = 0.5;
    Float2.min = 0;
    Float2.max = 0;
    Float2.isBoolean = false;
    Float2.matrixMode = 0;
    Float2.animationType = BABYLON.AnimatedInputBlockTypes.None;
    Float2.isConstant = false;

    // InputBlock
    var pbr_metallic = new BABYLON.InputBlock("pbr_metallic");
    pbr_metallic.visibleInInspector = false;
    pbr_metallic.visibleOnFrame = false;
    pbr_metallic.target = 1;
    pbr_metallic.value = 0;
    pbr_metallic.min = 0;
    pbr_metallic.max = 0;
    pbr_metallic.isBoolean = false;
    pbr_metallic.matrixMode = 0;
    pbr_metallic.animationType = BABYLON.AnimatedInputBlockTypes.None;
    pbr_metallic.isConstant = false;

    // InputBlock
    var pbr_roughness = new BABYLON.InputBlock("pbr_roughness");
    pbr_roughness.visibleInInspector = false;
    pbr_roughness.visibleOnFrame = false;
    pbr_roughness.target = 1;
    pbr_roughness.value = 1;
    pbr_roughness.min = 0;
    pbr_roughness.max = 0;
    pbr_roughness.isBoolean = false;
    pbr_roughness.matrixMode = 0;
    pbr_roughness.animationType = BABYLON.AnimatedInputBlockTypes.None;
    pbr_roughness.isConstant = false;

    // FragmentOutputBlock
    var FragmentOutput = new BABYLON.FragmentOutputBlock("FragmentOutput");
    FragmentOutput.visibleInInspector = false;
    FragmentOutput.visibleOnFrame = false;
    FragmentOutput.target = 2;
    FragmentOutput.convertToGammaSpace = false;
    FragmentOutput.convertToLinearSpace = false;
    FragmentOutput.useLogarithmicDepth = false;

    // TransformBlock
    var WorldPosViewProjectionTransform = new BABYLON.TransformBlock("WorldPos * ViewProjectionTransform");
    WorldPosViewProjectionTransform.visibleInInspector = false;
    WorldPosViewProjectionTransform.visibleOnFrame = false;
    WorldPosViewProjectionTransform.target = 1;
    WorldPosViewProjectionTransform.complementZ = 0;
    WorldPosViewProjectionTransform.complementW = 1;

    // InputBlock
    var ViewProjection = new BABYLON.InputBlock("ViewProjection");
    ViewProjection.visibleInInspector = false;
    ViewProjection.visibleOnFrame = false;
    ViewProjection.target = 1;
    ViewProjection.setAsSystemValue(BABYLON.NodeMaterialSystemValues.ViewProjection);

    // VertexOutputBlock
    var VertexOutput = new BABYLON.VertexOutputBlock("VertexOutput");
    VertexOutput.visibleInInspector = false;
    VertexOutput.visibleOnFrame = false;
    VertexOutput.target = 1;

    // Connections
    position.output.connectTo(WorldPos.vector);
    World.output.connectTo(WorldPos.transform);
    WorldPos.output.connectTo(WorldPosViewProjectionTransform.vector);
    ViewProjection.output.connectTo(WorldPosViewProjectionTransform.transform);
    WorldPosViewProjectionTransform.output.connectTo(VertexOutput.vector);
    WorldPos.output.connectTo(PBRMetallicRoughness.worldPosition);
    normal.output.connectTo(Worldnormal.vector);
    World.output.connectTo(Worldnormal.transform);
    Worldnormal.output.connectTo(PBRMetallicRoughness.worldNormal);
    view.output.connectTo(PBRMetallicRoughness.view);
    cameraPosition.output.connectTo(PBRMetallicRoughness.cameraPosition);
    uv.output.connectTo(Multiply3.left);
    uColorNoiseScale.output.connectTo(Multiply3.right);
    Multiply3.output.connectTo(VectorMerger1.xyIn);
    RealTime.output.connectTo(VectorMerger1.z);
    VectorMerger1.xyz.connectTo(SimplexPerlinD.seed);
    SimplexPerlinD.output.connectTo(Add1.left);
    Float.output.connectTo(Add1.right);
    Add1.output.connectTo(Divide.left);
    hueScale_division.output.connectTo(Divide.right);
    Divide.output.connectTo(VectorMerger.x);
    Divide.output.connectTo(VectorMerger.y);
    Divide.output.connectTo(VectorMerger.z);
    VectorMerger.xyz.connectTo(Add.left);
    hsvrgb_x.output.connectTo(VectorMerger2.x);
    hsvrgb_y.output.connectTo(Divide1.left);
    hsvrgb_y1.output.connectTo(Divide1.right);
    Divide1.output.connectTo(VectorMerger2.y);
    hsvrgb_z.output.connectTo(Divide2.left);
    hsvrgb_z1.output.connectTo(Divide2.right);
    Divide2.output.connectTo(VectorMerger2.z);
    hsvrgb_w.output.connectTo(VectorMerger2.w);
    VectorMerger2.xyz.connectTo(Add.right);
    Add.output.connectTo(Fract.input);
    Fract.output.connectTo(Multiply2.left);
    hsvrgb_vec_scale.output.connectTo(Multiply2.right);
    Multiply2.output.connectTo(Subtract1.left);
    hsvrgb_w.output.connectTo(VectorMerger3.x);
    hsvrgb_w.output.connectTo(VectorMerger3.y);
    hsvrgb_w.output.connectTo(VectorMerger3.z);
    VectorMerger3.xyz.connectTo(Subtract1.right);
    Subtract1.output.connectTo(Abs.input);
    Abs.output.connectTo(Subtract.left);
    hsvrgb_xxx.output.connectTo(VectorMerger4.x);
    hsvrgb_xxx.output.connectTo(VectorMerger4.y);
    hsvrgb_xxx.output.connectTo(VectorMerger4.z);
    VectorMerger4.xyz.connectTo(Subtract.right);
    Subtract.output.connectTo(Clamp.value);
    Clamp.output.connectTo(Multiply1.left);
    uv1.output.connectTo(Multiply4.left);
    uBlackNoiseScale.output.connectTo(Multiply4.right);
    Multiply4.output.connectTo(VectorMerger5.xyIn);
    RealTime1.output.connectTo(VectorMerger5.z);
    VectorMerger5.xyz.connectTo(SimplexPerlinD1.seed);
    SimplexPerlinD1.output.connectTo(Pow.value);
    uBlackNoiseExpo.output.connectTo(Pow.power);
    Pow.output.connectTo(Clamp1.value);
    Clamp1.output.connectTo(Multiply1.right);
    Multiply1.output.connectTo(Multiply.left);
    Float1.output.connectTo(Subtract2.left);
    uRectangleMaskStrength.output.connectTo(Multiply5.left);
    uv2.output.connectTo(VectorSplitter.xyIn);
    VectorSplitter.x.connectTo(Subtract3.left);
    Float2.output.connectTo(Subtract3.right);
    Subtract3.output.connectTo(Abs1.input);
    Abs1.output.connectTo(Multiply5.right);
    Multiply5.output.connectTo(Subtract2.right);
    Subtract2.output.connectTo(VectorMerger6.x);
    Subtract2.output.connectTo(VectorMerger6.y);
    Subtract2.output.connectTo(VectorMerger6.z);
    VectorMerger6.xyz.connectTo(Multiply.right);
    Multiply.output.connectTo(PBRMetallicRoughness.baseColor);
    pbr_metallic.output.connectTo(PBRMetallicRoughness.metallic);
    pbr_roughness.output.connectTo(PBRMetallicRoughness.roughness);
    PBRMetallicRoughness.diffuseDir.connectTo(FragmentOutput.rgb);
    PBRMetallicRoughness.alpha.connectTo(FragmentOutput.a);

    // Output nodes
    nodeMaterial.addOutputNode(VertexOutput);
    nodeMaterial.addOutputNode(FragmentOutput);
    nodeMaterial.build();



    // ground.material = nodeMaterial;
    plane.material = nodeMaterial;

    
    var gl = new BABYLON.GlowLayer("glow", scene, {
        mainTextureFixedSize: 512,
        blurKernelSize: 32,
    });
    gl.intensity = 0.05;
    gl.referenceMeshToUseItsOwnMaterial(plane);
    

    /*
    var parameters = {
        // edge_blur: 0.2,
        // chromatic_aberration: 1.0,
        // distortion: 2,
        // etc.
    };
    */

    // var lensEffect = new BABYLON.LensRenderingPipeline('lensEffects', parameters, scene, 1.0, [camera]);
    // lensEffect.edgeDistortion = 1;
    

    // Create default pipeline
    
    var defaultPipeline = new BABYLON.DefaultRenderingPipeline("default", true, scene, [camera]);
    
    var curve = new BABYLON.ColorCurves();

    curve.globalHue = 0; // [0, 360] same for below
    curve.globalDensity = 0; // [-100, 100]
    curve.globalSaturation = 0; // [-100, 100]
    
    curve.highlightsHue = 180;
    curve.highlightsDensity = 100;
    curve.highlightsSaturation = 100;
    
    curve.shadowsHue = 0;
    curve.shadowsDensity = 100;
    curve.shadowsSaturation = 100;
    
    defaultPipeline.imageProcessing.colorCurves = curve;

    defaultPipeline.imageProcessing.contrast = 1.2;
    defaultPipeline.imageProcessing.exposure = 5;
    

    defaultPipeline.bloomEnabled = true;
    defaultPipeline.bloomKernel = 32;
    defaultPipeline.bloomWeight = 5;
    defaultPipeline.bloomThreshold = 0.5;
    defaultPipeline.bloomScale = 2;

    defaultPipeline.chromaticAberrationEnabled = true;
    defaultPipeline.chromaticAberration.aberrationAmount = 100;
    defaultPipeline.chromaticAberration.radialIntensity = 0;

    defaultPipeline.sharpenEnabled = true;
    defaultPipeline.sharpen.edgeAmount = 10;
    defaultPipeline.sharpen.colorAmount = 1.5;
    

    BABYLON.ShaderStore.ShadersStore["customVertexShader"]=
    `#version 300 es
    precision highp float;

    // Attributes
    in vec3 position;
    in vec2 uv;

    // Uniforms
    uniform mat4 worldViewProjection;

    // Varying
    out vec2 vUV;

    void main(void) {
        gl_Position = worldViewProjection * vec4(position, 1.0);
        
        
        vUV = uv;
    }`

    BABYLON.ShaderStore.ShadersStore["customFragmentShader"]=
    `precision highp float;

    varying vec2 vUV;
    uniform sampler2D textureSampler;
    uniform float time;
    float maxDistortion = 0.4; // Adjust this value as needed

    void main(void) 
    {
        vec2 uv = vUV - vec2(0.5);
        float uva = atan(uv.x, uv.y);
        float uvd = sqrt(dot(uv, uv));
        // k = negative for pincushion, positive for barrel
        // float k = 10.0 * sin(time * 10.0) + 100.0;
        // float k = -0.3 * time;
        float k = 5.0 * sin(time * 0.3);
        uvd = uvd*(1.0 + k*uvd*uvd);
        uvd = clamp(uvd, 0.0, maxDistortion);

        gl_FragColor = texture(textureSampler, vec2(0.5) + vec2(sin(uva), cos(uva))*uvd);
        // gl_FragColor = texture(textureSampler, 0.5 * (uv + uvd * normalize(uv)));

    }`

    var standardPipeline = new BABYLON.PostProcessRenderPipeline(engine, "standardPipeline");

    var postProcess = new BABYLON.PostProcess("pincushion", "custom", ["time"], ["textureSampler"], 1, camera);
    let realistTime = 0;
    postProcess.onApply = function (effect) {
        // effect.setTextureSampler("textureSampler", new BABYLON.TextureSampler())
        effect.setFloat("time", realistTime);
        // console.log(realistTime);
        // console.log(realistTime)
    };
    
    var standardSharpen = new BABYLON.SharpenPostProcess("standardSharpen", null, camera);
    standardSharpen.edgeAmount = 10;
    standardSharpen.colorAmount = 50;

    // var standardBloom = new BABYLON.BloomMergePostProcess("bloomMerge", postProcess, standardSharpen)

    var orderedEffects = new BABYLON.PostProcessRenderEffect(engine, "effects", function() { return [standardSharpen, postProcess] });
    standardPipeline.addEffect(orderedEffects);
    scene.postProcessRenderPipelineManager.addPipeline(standardPipeline);
    // scene.postProcessRenderPipelineManager.attachCamerasToRenderPipeline("standardPipeline", camera);

    // Scene RegisterBeforeRender()
    scene.registerBeforeRender(()=> {
        // box1.rotation.x += 0.027;
        // box1.rotation.y += 0.027;
    
        let delta  = engine.getDeltaTime()
        // box2.rotation.x += 0.0015*delta;
        // box2.rotation.y += 0.0015*delta;
        realistTime += 0.00015*delta;
    });

    return scene;
};