const { describe, it } = require('node:test');
const assert = require('node:assert');
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '../..');

describe('Video Fixtures', () => {
    const fixtures = require('../../fixtures/two-videos/videos');

    it('should contain exactly 2 videos', () => {
        assert.strictEqual(fixtures.length, 2);
    });

    it('first video should be named SampleVideo_1280x720_1mb.mp4', () => {
        assert.strictEqual(fixtures[0].name, 'SampleVideo_1280x720_1mb.mp4');
    });

    it('second video should be named Another video.mp4', () => {
        assert.strictEqual(fixtures[1].name, 'Another video.mp4');
    });

    it('each video should have an _id field', () => {
        for (const video of fixtures) {
            assert.ok(video._id, 'Video must have an _id');
        }
    });
});

describe('Project Structure', () => {
    const requiredFiles = [
        'docker-compose.yml',
        'gateway/Dockerfile-dev',
        'gateway/package.json',
        'gateway/src/index.js',
        'metadata/Dockerfile-dev',
        'metadata/package.json',
        'metadata/src/index.js',
        'db-fixture-rest-api/Dockerfile',
        'db-fixture-rest-api/package.json',
    ];

    for (const file of requiredFiles) {
        it(`should have ${file}`, () => {
            const filePath = path.join(ROOT, file);
            assert.ok(fs.existsSync(filePath), `Missing file: ${file}`);
        });
    }
});

describe('Gateway Service', () => {
    const pkg = require('../../gateway/package.json');

    it('should have express dependency', () => {
        assert.ok(pkg.dependencies.express, 'express is required');
    });

    it('should have a start script', () => {
        assert.ok(pkg.scripts.start, 'start script is required');
    });

    it('should have hbs (Handlebars) dependency', () => {
        assert.ok(pkg.dependencies.hbs, 'hbs is required');
    });
});

describe('Metadata Service', () => {
    const pkg = require('../../metadata/package.json');

    it('should have express dependency', () => {
        assert.ok(pkg.dependencies.express, 'express is required');
    });

    it('should have mongodb dependency', () => {
        assert.ok(pkg.dependencies.mongodb, 'mongodb is required');
    });

    it('should have a start script', () => {
        assert.ok(pkg.scripts.start, 'start script is required');
    });
});
